#!/usr/bin/env node

/**
 * Integration Test for Figma to Style Dictionary Setup
 * 
 * This script validates that the integration is properly configured
 * and all components are working correctly.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

let passedTests = 0;
let failedTests = 0;

function test(name, callback) {
  try {
    callback();
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    passedTests++;
    return true;
  } catch (error) {
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}${error.message}${colors.reset}`);
    failedTests++;
    return false;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function fileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

function directoryExists(dirPath) {
  const fullPath = path.join(projectRoot, dirPath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

function fileContains(filePath, searchString) {
  const fullPath = path.join(projectRoot, filePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  return content.includes(searchString);
}

function isValidJSON(filePath) {
  try {
    const fullPath = path.join(projectRoot, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
}

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║         Figma Integration - Validation Tests             ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

// Test 1: Package Configuration
console.log(`${colors.cyan}Package Configuration${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('package.json exists', () => {
  assert(fileExists('package.json'), 'package.json not found');
});

test('package.json has required scripts', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  assert(pkg.scripts['tokens:build'], 'tokens:build script missing');
  assert(pkg.scripts['tokens:sync'], 'tokens:sync script missing');
  assert(pkg.scripts['figma:sync'], 'figma:sync script missing');
  assert(pkg.scripts['figma:status'], 'figma:status script missing');
});

test('package.json has required dependencies', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));
  assert(pkg.devDependencies['style-dictionary'], 'style-dictionary dependency missing');
  assert(pkg.devDependencies['dotenv'], 'dotenv dependency missing');
});

console.log('');

// Test 2: Configuration Files
console.log(`${colors.cyan}Configuration Files${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('Style Dictionary config exists', () => {
  assert(fileExists('config/style-dictionary.config.mjs'), 'Style Dictionary config not found');
});

test('Style Dictionary config is valid', () => {
  assert(fileContains('config/style-dictionary.config.mjs', 'source'), 'Invalid Style Dictionary config');
  assert(fileContains('config/style-dictionary.config.mjs', 'platforms'), 'Invalid Style Dictionary config');
});

test('.env.example exists', () => {
  assert(fileExists('.env.example'), '.env.example not found');
});

test('.env.example has required variables', () => {
  assert(fileContains('.env.example', 'FIGMA_ACCESS_TOKEN'), 'FIGMA_ACCESS_TOKEN not in .env.example');
  assert(fileContains('.env.example', 'FIGMA_FILE_KEY'), 'FIGMA_FILE_KEY not in .env.example');
});

test('.gitignore includes build directory', () => {
  assert(fileContains('.gitignore', 'build/'), 'build/ not in .gitignore');
});

test('.gitignore includes .env file', () => {
  assert(fileContains('.gitignore', '.env'), '.env not in .gitignore');
});

console.log('');

// Test 3: Scripts
console.log(`${colors.cyan}Scripts${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('Figma sync script exists', () => {
  assert(fileExists('scripts/sync-figma-tokens.mjs'), 'sync-figma-tokens.mjs not found');
});

test('Figma MCP script exists', () => {
  assert(fileExists('scripts/figma-mcp.mjs'), 'figma-mcp.mjs not found');
});

test('Demo script exists', () => {
  assert(fileExists('scripts/demo-integration.sh'), 'demo-integration.sh not found');
});

test('Figma sync script has required functions', () => {
  assert(fileContains('scripts/sync-figma-tokens.mjs', 'fetchFigmaData'), 'fetchFigmaData function missing');
  assert(fileContains('scripts/sync-figma-tokens.mjs', 'parseStyles'), 'parseStyles function missing');
  assert(fileContains('scripts/sync-figma-tokens.mjs', 'parseVariables'), 'parseVariables function missing');
});

test('Figma MCP script has CLI interface', () => {
  assert(fileContains('scripts/figma-mcp.mjs', 'printBanner'), 'printBanner function missing');
  assert(fileContains('scripts/figma-mcp.mjs', 'checkConfiguration'), 'checkConfiguration function missing');
});

console.log('');

// Test 4: Token Files
console.log(`${colors.cyan}Token Files${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('tokens directory exists', () => {
  assert(directoryExists('tokens'), 'tokens directory not found');
});

test('color tokens exist', () => {
  assert(fileExists('tokens/color/base.json'), 'color/base.json not found');
});

test('typography tokens exist', () => {
  assert(fileExists('tokens/typography/base.json'), 'typography/base.json not found');
});

test('spacing tokens exist', () => {
  assert(fileExists('tokens/spacing/base.json'), 'spacing/base.json not found');
});

test('shadow tokens exist', () => {
  assert(fileExists('tokens/shadow/base.json'), 'shadow/base.json not found');
});

test('border tokens exist', () => {
  assert(fileExists('tokens/border/base.json'), 'border/base.json not found');
});

test('color tokens are valid JSON', () => {
  assert(isValidJSON('tokens/color/base.json'), 'color/base.json is not valid JSON');
});

test('color tokens have required structure', () => {
  const colorTokens = JSON.parse(fs.readFileSync(path.join(projectRoot, 'tokens/color/base.json'), 'utf8'));
  assert(colorTokens.color, 'color key missing in color tokens');
  assert(colorTokens.color.primary, 'primary color missing');
  assert(colorTokens.color.primary.main, 'primary.main color missing');
  assert(colorTokens.color.primary.main.value, 'color value missing');
});

console.log('');

// Test 5: Build Output
console.log(`${colors.cyan}Build Output${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('build directory exists', () => {
  assert(directoryExists('build/tokens'), 'build/tokens directory not found');
});

test('CSS output exists', () => {
  assert(fileExists('build/tokens/css/variables.css'), 'CSS variables not generated');
});

test('JS output exists', () => {
  assert(fileExists('build/tokens/js/tokens.js'), 'JS tokens not generated');
});

test('TS output exists', () => {
  assert(fileExists('build/tokens/ts/tokens.ts'), 'TS tokens not generated');
});

test('JSON output exists', () => {
  assert(fileExists('build/tokens/json/tokens.json'), 'JSON tokens not generated');
});

test('CSS output has CSS variables', () => {
  assert(fileContains('build/tokens/css/variables.css', ':root'), 'CSS missing :root');
  assert(fileContains('build/tokens/css/variables.css', '--color-primary-main'), 'CSS missing color variables');
});

test('JS output has exports', () => {
  assert(fileContains('build/tokens/js/tokens.js', 'export const'), 'JS missing exports');
});

test('JSON output is valid', () => {
  assert(isValidJSON('build/tokens/json/tokens.json'), 'Generated JSON is not valid');
});

console.log('');

// Test 6: Documentation
console.log(`${colors.cyan}Documentation${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
test('docs directory exists', () => {
  assert(directoryExists('docs'), 'docs directory not found');
});

test('Figma integration guide exists', () => {
  assert(fileExists('docs/FIGMA_INTEGRATION.md'), 'FIGMA_INTEGRATION.md not found');
});

test('Quick start guide exists', () => {
  assert(fileExists('docs/FIGMA_QUICK_START.md'), 'FIGMA_QUICK_START.md not found');
});

test('README updated with Figma info', () => {
  assert(fileContains('README.md', 'Figma'), 'README missing Figma section');
  assert(fileContains('README.md', 'Style Dictionary'), 'README missing Style Dictionary section');
});

test('Integration guide has setup instructions', () => {
  assert(fileContains('docs/FIGMA_INTEGRATION.md', 'Setup'), 'Missing setup section');
  assert(fileContains('docs/FIGMA_INTEGRATION.md', 'FIGMA_ACCESS_TOKEN'), 'Missing token instructions');
  assert(fileContains('docs/FIGMA_INTEGRATION.md', 'npm run figma:sync'), 'Missing sync instructions');
});

console.log('');

// Summary
console.log('═════════════════════════════════════════════════════════');
console.log(`${colors.cyan}Test Summary${colors.reset}`);
console.log('─────────────────────────────────────────────────────────');
console.log(`Total tests: ${passedTests + failedTests}`);
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);
console.log('═════════════════════════════════════════════════════════\n');

if (failedTests === 0) {
  console.log(`${colors.green}✓ All tests passed! Integration is properly configured.${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}✗ Some tests failed. Please review the errors above.${colors.reset}\n`);
  process.exit(1);
}
