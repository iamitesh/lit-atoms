#!/bin/bash

# Figma to Style Dictionary - Integration Demo
# This script demonstrates the complete workflow

set -e

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║        Figma to Style Dictionary Integration Demo        ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"
echo "----------------------------------------"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js version: $(node --version)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm version: $(npm --version)${NC}"

echo ""

# Step 2: Show directory structure
echo -e "${BLUE}Step 2: Project structure${NC}"
echo "----------------------------------------"
echo "Token sources:"
tree -L 2 tokens/ 2>/dev/null || find tokens/ -type f -o -type d | head -20
echo ""

# Step 3: Build tokens with Style Dictionary
echo -e "${BLUE}Step 3: Building tokens with Style Dictionary${NC}"
echo "----------------------------------------"
echo "Running: node config/style-dictionary.config.mjs"
echo ""
node config/style-dictionary.config.mjs
echo ""
echo -e "${GREEN}✓ Tokens built successfully!${NC}"
echo ""

# Step 4: Show generated files
echo -e "${BLUE}Step 4: Generated token files${NC}"
echo "----------------------------------------"
echo "Output directory:"
tree -L 2 build/tokens/ 2>/dev/null || ls -R build/tokens/
echo ""

# Step 5: Show sample outputs
echo -e "${BLUE}Step 5: Sample outputs${NC}"
echo "----------------------------------------"
echo ""
echo -e "${YELLOW}CSS Variables (first 15 lines):${NC}"
head -15 build/tokens/css/variables.css
echo ""
echo -e "${YELLOW}JSON Tokens (first 20 lines):${NC}"
head -20 build/tokens/json/tokens.json
echo ""
echo -e "${YELLOW}JavaScript Tokens (first 10 lines):${NC}"
head -10 build/tokens/js/tokens.js
echo ""

# Step 6: Show available commands
echo -e "${BLUE}Step 6: Available commands${NC}"
echo "----------------------------------------"
echo ""
echo -e "${YELLOW}For Figma sync (requires credentials):${NC}"
echo "  npm run figma:sync              # Interactive prompt-based sync"
echo "  npm run figma:sync sync         # Just sync from Figma"
echo "  npm run figma:sync build        # Just build tokens"
echo "  npm run figma:status            # Check configuration"
echo ""
echo -e "${YELLOW}For manual token management:${NC}"
echo "  npm run tokens:sync             # Fetch from Figma"
echo "  npm run tokens:build            # Build Style Dictionary"
echo ""

# Step 7: Verify configuration status
echo -e "${BLUE}Step 7: Configuration status${NC}"
echo "----------------------------------------"
echo ""
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file found${NC}"
else
    echo -e "${YELLOW}⚠ .env file not found (needed for Figma sync)${NC}"
    echo "  Run: cp .env.example .env"
    echo "  Then add your FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY"
fi
echo ""

# Step 8: Final summary
echo -e "${BLUE}Summary${NC}"
echo "=========================================="
echo ""
echo -e "${GREEN}✓ Style Dictionary is configured and working${NC}"
echo -e "${GREEN}✓ Token files are generated successfully${NC}"
echo -e "${GREEN}✓ Multiple output formats available (CSS, JS, TS, JSON)${NC}"
echo ""
echo "Next steps:"
echo "1. Set up Figma credentials in .env file"
echo "2. Run 'npm run figma:sync' to sync from Figma"
echo "3. Use generated tokens in your components"
echo ""
echo "Documentation:"
echo "  - Quick Start: docs/FIGMA_QUICK_START.md"
echo "  - Full Guide:  docs/FIGMA_INTEGRATION.md"
echo ""
echo -e "${GREEN}Demo completed successfully!${NC}"
