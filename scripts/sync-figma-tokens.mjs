#!/usr/bin/env node

/**
 * Figma to Style Dictionary Sync Script
 * 
 * This script fetches design tokens from Figma and converts them to Style Dictionary format.
 * It uses the Figma REST API to fetch styles and variables from a Figma file.
 * 
 * Requirements:
 * - FIGMA_ACCESS_TOKEN environment variable
 * - FIGMA_FILE_KEY environment variable
 * 
 * Usage:
 *   node scripts/sync-figma-tokens.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_ACCESS_TOKEN) {
  console.error('❌ Error: FIGMA_ACCESS_TOKEN environment variable is not set');
  console.log('Please set it in your .env file or export it:');
  console.log('  export FIGMA_ACCESS_TOKEN="your-token-here"');
  process.exit(1);
}

if (!FIGMA_FILE_KEY) {
  console.error('❌ Error: FIGMA_FILE_KEY environment variable is not set');
  console.log('Please set it in your .env file or export it:');
  console.log('  export FIGMA_FILE_KEY="your-file-key-here"');
  process.exit(1);
}

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Fetch data from Figma API
 */
async function fetchFigmaData(endpoint) {
  const url = `${FIGMA_API_BASE}${endpoint}`;
  console.log(`📡 Fetching from Figma: ${endpoint}`);
  
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convert Figma color to hex
 */
function figmaColorToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Parse Figma styles and convert to tokens
 */
function parseStyles(styles) {
  const tokens = {
    color: {},
    typography: {},
    shadow: {},
  };

  for (const [styleId, style] of Object.entries(styles)) {
    const styleName = style.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    
    if (style.style_type === 'FILL') {
      // Color tokens
      const parts = styleName.split('-');
      let current = tokens.color;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      const lastPart = parts[parts.length - 1];
      if (style.fills && style.fills[0] && style.fills[0].color) {
        current[lastPart] = { value: figmaColorToHex(style.fills[0].color) };
      }
    } else if (style.style_type === 'TEXT') {
      // Typography tokens
      const parts = styleName.split('-');
      let current = tokens.typography;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      const lastPart = parts[parts.length - 1];
      if (style.type_style) {
        current[lastPart] = {
          fontFamily: { value: style.type_style.fontFamily || '' },
          fontSize: { value: `${style.type_style.fontSize}px` || '' },
          fontWeight: { value: String(style.type_style.fontWeight || 400) },
        };
      }
    } else if (style.style_type === 'EFFECT') {
      // Shadow/effect tokens
      const parts = styleName.split('-');
      let current = tokens.shadow;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      const lastPart = parts[parts.length - 1];
      if (style.effects && style.effects[0]) {
        const effect = style.effects[0];
        if (effect.type === 'DROP_SHADOW') {
          const shadow = `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${figmaColorToHex(effect.color)}`;
          current[lastPart] = { value: shadow };
        }
      }
    }
  }

  return tokens;
}

/**
 * Parse Figma variables (for Figma's newer variable system)
 */
function parseVariables(variables) {
  const tokens = {
    color: {},
    spacing: {},
    border: {},
  };

  if (!variables || !variables.meta || !variables.meta.variables) {
    return tokens;
  }

  for (const [varId, variable] of Object.entries(variables.meta.variables)) {
    const varName = variable.name.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
    const parts = varName.split('-');
    
    // Determine token category
    let category = tokens.color;
    if (varName.includes('spacing') || varName.includes('space')) {
      category = tokens.spacing;
    } else if (varName.includes('border') || varName.includes('radius')) {
      category = tokens.border;
    }

    // Build nested structure
    let current = category;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    const lastPart = parts[parts.length - 1];
    
    // Get the value from the first mode (default mode)
    if (variable.valuesByMode) {
      const modeId = Object.keys(variable.valuesByMode)[0];
      const value = variable.valuesByMode[modeId];
      
      if (variable.resolvedType === 'COLOR' && typeof value === 'object') {
        current[lastPart] = { value: figmaColorToHex(value) };
      } else if (typeof value === 'number') {
        current[lastPart] = { value: `${value}px` };
      } else if (typeof value === 'string') {
        current[lastPart] = { value: value };
      }
    }
  }

  return tokens;
}

/**
 * Write tokens to JSON files
 */
function writeTokenFiles(tokens, outputDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write each token category to a separate file
  for (const [category, categoryTokens] of Object.entries(tokens)) {
    if (Object.keys(categoryTokens).length === 0) continue;
    
    const categoryDir = path.join(outputDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }

    const filePath = path.join(categoryDir, 'figma.json');
    const content = JSON.stringify({ [category]: categoryTokens }, null, 2);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Written ${category} tokens to ${filePath}`);
  }
}

/**
 * Main sync function
 */
async function syncFigmaTokens() {
  console.log('🚀 Starting Figma token sync...');
  console.log(`📁 File Key: ${FIGMA_FILE_KEY}`);

  try {
    // Fetch file data
    const fileData = await fetchFigmaData(`/files/${FIGMA_FILE_KEY}`);
    console.log(`✅ Fetched file: ${fileData.name}`);

    // Fetch styles
    const stylesData = await fetchFigmaData(`/files/${FIGMA_FILE_KEY}/styles`);
    console.log(`✅ Fetched ${Object.keys(stylesData.meta.styles || {}).length} styles`);

    // Fetch variables (if available)
    let variablesData = null;
    try {
      variablesData = await fetchFigmaData(`/files/${FIGMA_FILE_KEY}/variables/local`);
      console.log(`✅ Fetched ${Object.keys(variablesData.meta?.variables || {}).length} variables`);
    } catch (error) {
      console.log('⚠️  Variables not available (file may not use variable system)');
    }

    // Parse tokens
    const styleTokens = parseStyles(stylesData.meta.styles || {});
    const variableTokens = variablesData ? parseVariables(variablesData) : {};

    // Merge tokens (variables take precedence)
    const mergedTokens = {
      color: { ...styleTokens.color, ...variableTokens.color },
      typography: { ...styleTokens.typography, ...variableTokens.typography },
      spacing: { ...styleTokens.spacing, ...variableTokens.spacing },
      shadow: { ...styleTokens.shadow, ...variableTokens.shadow },
      border: { ...styleTokens.border, ...variableTokens.border },
    };

    // Write to token files
    const tokensDir = path.join(__dirname, '..', 'tokens');
    writeTokenFiles(mergedTokens, tokensDir);

    console.log('✅ Figma token sync completed successfully!');
    console.log('📝 Next step: Run "npm run build:tokens" to generate theme files');

  } catch (error) {
    console.error('❌ Error syncing Figma tokens:', error.message);
    process.exit(1);
  }
}

// Run the sync
syncFigmaTokens();
