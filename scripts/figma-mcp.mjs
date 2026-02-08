#!/usr/bin/env node

/**
 * Figma MCP - Prompt-based Figma to Style Dictionary Sync
 * 
 * This tool provides a conversational interface to sync design tokens from Figma.
 * It allows users to trigger syncs with simple prompts.
 * 
 * Usage:
 *   npm run figma:sync
 *   npm run figma:sync "update tokens from figma"
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for better terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function printBanner() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'cyan');
  log('║                    FIGMA MCP SYNC TOOL                    ║', 'cyan');
  log('║          Design Tokens from Figma to Style Dictionary     ║', 'cyan');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'cyan');
}

function printHelp() {
  log('Available Commands:', 'bright');
  log('  sync              - Sync tokens from Figma to Style Dictionary', 'yellow');
  log('  build             - Build Style Dictionary from tokens', 'yellow');
  log('  sync-and-build    - Sync from Figma and build tokens', 'yellow');
  log('  status            - Check configuration status', 'yellow');
  log('  help              - Show this help message\n', 'yellow');
  
  log('Environment Variables:', 'bright');
  log('  FIGMA_ACCESS_TOKEN - Your Figma personal access token', 'yellow');
  log('  FIGMA_FILE_KEY     - The Figma file key (from URL)\n', 'yellow');
  
  log('Examples:', 'bright');
  log('  npm run figma:sync', 'yellow');
  log('  npm run figma:sync sync', 'yellow');
  log('  npm run figma:sync "update my tokens from figma"\n', 'yellow');
}

function checkConfiguration() {
  const envPath = path.join(__dirname, '..', '.env');
  const hasEnvFile = fs.existsSync(envPath);
  
  log('\n📋 Configuration Status:', 'bright');
  log('─────────────────────────────────────────────────────────', 'cyan');
  
  const hasToken = !!process.env.FIGMA_ACCESS_TOKEN;
  const hasFileKey = !!process.env.FIGMA_FILE_KEY;
  
  log(`  .env file: ${hasEnvFile ? '✅ Found' : '❌ Not found'}`, hasEnvFile ? 'green' : 'red');
  log(`  FIGMA_ACCESS_TOKEN: ${hasToken ? '✅ Set' : '❌ Not set'}`, hasToken ? 'green' : 'red');
  log(`  FIGMA_FILE_KEY: ${hasFileKey ? '✅ Set' : '❌ Not set'}`, hasFileKey ? 'green' : 'red');
  
  log('─────────────────────────────────────────────────────────\n', 'cyan');
  
  if (!hasToken || !hasFileKey) {
    log('⚠️  Configuration incomplete!', 'yellow');
    log('\nTo set up:', 'bright');
    log('1. Create a .env file in the project root', 'yellow');
    log('2. Add the following lines:', 'yellow');
    log('   FIGMA_ACCESS_TOKEN=your-token-here', 'cyan');
    log('   FIGMA_FILE_KEY=your-file-key-here\n', 'cyan');
    log('Get your Figma access token: https://www.figma.com/developers/api#access-tokens', 'blue');
    log('Get file key from your Figma URL: figma.com/file/[FILE_KEY]/...\n', 'blue');
    return false;
  }
  
  return true;
}

async function syncFromFigma() {
  log('🚀 Syncing tokens from Figma...', 'bright');
  log('─────────────────────────────────────────────────────────', 'cyan');
  
  try {
    const { stdout, stderr } = await execAsync('node scripts/sync-figma-tokens.mjs');
    console.log(stdout);
    if (stderr) console.error(stderr);
    log('─────────────────────────────────────────────────────────', 'cyan');
    log('✅ Sync completed successfully!\n', 'green');
    return true;
  } catch (error) {
    log('─────────────────────────────────────────────────────────', 'cyan');
    log('❌ Sync failed:', 'red');
    console.error(error.message);
    return false;
  }
}

async function buildTokens() {
  log('🔨 Building Style Dictionary tokens...', 'bright');
  log('─────────────────────────────────────────────────────────', 'cyan');
  
  try {
    const { stdout, stderr } = await execAsync('node config/style-dictionary.config.mjs');
    console.log(stdout);
    if (stderr) console.error(stderr);
    log('─────────────────────────────────────────────────────────', 'cyan');
    log('✅ Build completed successfully!\n', 'green');
    return true;
  } catch (error) {
    log('─────────────────────────────────────────────────────────', 'cyan');
    log('❌ Build failed:', 'red');
    console.error(error.message);
    return false;
  }
}

async function syncAndBuild() {
  const syncSuccess = await syncFromFigma();
  if (!syncSuccess) {
    log('❌ Aborting build due to sync failure\n', 'red');
    return false;
  }
  
  const buildSuccess = await buildTokens();
  if (!buildSuccess) {
    log('❌ Build failed\n', 'red');
    return false;
  }
  
  log('🎉 Complete! Tokens synced from Figma and built successfully!\n', 'green');
  return true;
}

function parsePrompt(prompt) {
  const lower = prompt.toLowerCase();
  
  // Detect intent from natural language prompts
  if (lower.includes('sync') && lower.includes('build')) {
    return 'sync-and-build';
  }
  if (lower.includes('sync') || lower.includes('update') || lower.includes('fetch') || lower.includes('pull')) {
    return 'sync';
  }
  if (lower.includes('build') || lower.includes('generate') || lower.includes('compile')) {
    return 'build';
  }
  if (lower.includes('status') || lower.includes('config') || lower.includes('check')) {
    return 'status';
  }
  if (lower.includes('help')) {
    return 'help';
  }
  
  // Default to sync-and-build if unclear
  return 'sync-and-build';
}

async function main() {
  printBanner();
  
  const args = process.argv.slice(2);
  const userPrompt = args.join(' ').trim();
  
  let command = 'sync-and-build'; // default
  
  if (userPrompt) {
    command = parsePrompt(userPrompt);
    log(`📝 Interpreted command: ${command}`, 'blue');
    log('');
  }
  
  // Execute command
  switch (command) {
    case 'help':
      printHelp();
      break;
      
    case 'status':
      checkConfiguration();
      break;
      
    case 'sync':
      if (!checkConfiguration()) {
        process.exit(1);
      }
      await syncFromFigma();
      break;
      
    case 'build':
      await buildTokens();
      break;
      
    case 'sync-and-build':
      if (!checkConfiguration()) {
        process.exit(1);
      }
      await syncAndBuild();
      break;
      
    default:
      log('❌ Unknown command. Use "help" to see available commands.\n', 'red');
      printHelp();
      process.exit(1);
  }
}

main().catch(error => {
  log('\n❌ Fatal error:', 'red');
  console.error(error);
  process.exit(1);
});
