# Figma to Style Dictionary Integration

This setup enables automatic synchronization of design tokens from Figma to Style Dictionary, allowing designers to update tokens in Figma and have them automatically flow into the codebase.

## Overview

The integration consists of:

1. **Figma API Integration** - Fetches design tokens from Figma files
2. **Style Dictionary** - Transforms tokens into various formats (CSS, JS, TS, JSON)
3. **MCP Interface** - Prompt-based CLI for easy token management
4. **WSL Compatible** - Works seamlessly on Windows Subsystem for Linux

## Architecture

```
Figma File (Design Source)
    ↓
Figma API (REST)
    ↓
sync-figma-tokens.mjs (Fetcher)
    ↓
tokens/*.json (Style Dictionary Format)
    ↓
style-dictionary.config.mjs (Builder)
    ↓
build/tokens/* (Output: CSS, JS, TS, JSON)
```

## Setup

### 1. Prerequisites

- Node.js 20+ (or 22+ for full Style Dictionary support)
- Figma account with access to the design file
- Figma personal access token

### 2. Get Your Figma Credentials

#### Figma Access Token
1. Go to your Figma account settings: https://www.figma.com/settings
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Give it a name (e.g., "lit-atoms-sync")
5. Copy the token (you won't see it again!)

#### Figma File Key
1. Open your Figma file
2. Look at the URL: `https://www.figma.com/file/[FILE_KEY]/...`
3. Copy the `FILE_KEY` portion

### 3. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
FIGMA_ACCESS_TOKEN=your-figma-access-token-here
FIGMA_FILE_KEY=your-figma-file-key-here
```

### 4. Verify Configuration

Check that everything is set up correctly:

```bash
npm run figma:status
```

You should see:
```
✅ .env file found
✅ FIGMA_ACCESS_TOKEN set
✅ FIGMA_FILE_KEY set
```

## Usage

### Prompt-Based Interface (Recommended)

The easiest way to sync tokens is using natural language prompts:

```bash
# Sync tokens from Figma and build
npm run figma:sync

# Various ways to express the same thing:
npm run figma:sync "update tokens from figma"
npm run figma:sync "sync and build"
npm run figma:sync "pull latest design tokens"

# Just sync without building
npm run figma:sync sync

# Just build from existing tokens
npm run figma:sync build

# Check configuration
npm run figma:sync status

# Show help
npm run figma:sync help
```

### Direct Commands

For more control, use the underlying scripts directly:

```bash
# Sync from Figma (fetch and save to tokens/)
npm run tokens:sync

# Build tokens (generate CSS, JS, TS, JSON from tokens/)
npm run tokens:build
```

## How It Works

### 1. Figma Structure

The sync tool expects your Figma file to use either:

**Option A: Styles (Traditional)**
- Color styles (fills)
- Text styles
- Effect styles (shadows)

**Option B: Variables (Modern - Recommended)**
- Color variables
- Number variables (spacing, sizes)
- String variables

### 2. Token Mapping

The tool automatically maps Figma tokens to Style Dictionary format:

#### Colors
```
Figma Style: "Primary / Main"
→ tokens/color/figma.json
→ { "color": { "primary": { "main": { "value": "#1ea7fd" } } } }
```

#### Typography
```
Figma Text Style: "Heading / H1"
→ tokens/typography/figma.json
→ { "typography": { "heading": { "h1": { ... } } } }
```

#### Spacing
```
Figma Variable: "Spacing / Large"
→ tokens/spacing/figma.json
→ { "spacing": { "large": { "value": "24px" } } }
```

### 3. Token Files

Synced tokens are saved to `tokens/*/figma.json`:

```
tokens/
├── color/
│   ├── base.json        # Manual tokens (optional)
│   └── figma.json       # Auto-synced from Figma
├── typography/
│   ├── base.json
│   └── figma.json
├── spacing/
│   ├── base.json
│   └── figma.json
└── ... (other categories)
```

### 4. Build Output

Style Dictionary generates multiple formats in `build/tokens/`:

```
build/tokens/
├── css/
│   └── variables.css    # CSS custom properties
├── js/
│   └── tokens.js        # ES6 module
├── ts/
│   └── tokens.ts        # TypeScript module
└── json/
    └── tokens.json      # Nested JSON
```

## Integration with Existing Theme

### Using Generated Tokens in Your Code

```typescript
// Import the generated tokens
import tokens from '../build/tokens/js/tokens.js';

// Use in your theme
const theme = {
  palette: {
    primary: {
      main: tokens.color.primary.main,
      light: tokens.color.primary.light,
      dark: tokens.color.primary.dark,
    }
  }
};
```

### CSS Variables

Include the generated CSS file:

```html
<link rel="stylesheet" href="build/tokens/css/variables.css">
```

Use the variables:

```css
.button {
  background-color: var(--color-primary-main);
  padding: var(--spacing-md);
  font-family: var(--typography-font-family-base);
}
```

## Workflow

### For Designers

1. Update design tokens in Figma (colors, typography, spacing, etc.)
2. Notify developers that tokens are updated

### For Developers

1. Run sync command:
   ```bash
   npm run figma:sync "update tokens"
   ```

2. Review the changes in `tokens/*/figma.json`

3. Build your application with the new tokens:
   ```bash
   npm run build
   ```

4. Commit the updated token files:
   ```bash
   git add tokens/ build/tokens/
   git commit -m "chore: update design tokens from Figma"
   ```

## Best Practices

### Token Organization in Figma

1. **Use clear naming conventions**
   ```
   ✅ Primary / Main
   ✅ Text / Primary
   ✅ Spacing / Large
   
   ❌ Blue
   ❌ TextColor
   ❌ sp-lg
   ```

2. **Use slashes (/) for hierarchy**
   - Creates nested token structure
   - Better organization in code

3. **Use semantic names, not values**
   - ✅ `Primary`, `Secondary`, `Error`
   - ❌ `Blue`, `Red500`, `20px`

4. **Prefer Variables over Styles**
   - More flexible
   - Better for theming
   - Easier to reference

### Token Management

1. **Keep manual tokens separate**
   - Base tokens in `base.json`
   - Figma tokens in `figma.json`
   - Prevents overwriting custom tokens

2. **Version control tokens**
   - Commit `tokens/` directory
   - Commit `build/tokens/` directory
   - Team can see token changes in PRs

3. **Automate in CI/CD**
   ```yaml
   # Example GitHub Actions workflow
   - name: Sync Figma tokens
     run: npm run figma:sync
     env:
       FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
       FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
   ```

## Troubleshooting

### "FIGMA_ACCESS_TOKEN not set"

Make sure you have created a `.env` file with your credentials:
```bash
cp .env.example .env
# Edit .env with your credentials
```

### "Figma API error: 403 Forbidden"

Your access token is invalid or expired. Generate a new one from Figma settings.

### "Figma API error: 404 Not Found"

The file key is incorrect. Check your Figma URL and copy the correct file key.

### Empty tokens after sync

Your Figma file might not have styles or variables set up. Check that:
- You have color, text, or effect styles defined, OR
- You have variables defined in the file

### Style Dictionary build errors

Ensure you're using Node.js 20+ (or 22+ for full compatibility):
```bash
node --version
```

## WSL Support

This integration is fully compatible with Windows Subsystem for Linux (WSL):

1. Clone the repository in your WSL environment
2. Install Node.js in WSL (not Windows)
3. Set up `.env` file in WSL
4. Run commands from WSL terminal

```bash
# In WSL
cd /home/yourusername/lit-atoms
npm run figma:sync
```

## Advanced Usage

### Custom Token Transformations

Edit `config/style-dictionary.config.mjs` to add custom transformations:

```javascript
// Add custom format
StyleDictionary.registerFormat({
  name: 'custom/scss',
  formatter: function(dictionary) {
    return dictionary.allTokens.map(token => 
      `$${token.name}: ${token.value};`
    ).join('\n');
  }
});
```

### Selective Sync

Modify `scripts/sync-figma-tokens.mjs` to filter specific token categories:

```javascript
// Only sync colors and typography
const selectedTokens = {
  color: mergedTokens.color,
  typography: mergedTokens.typography,
};
writeTokenFiles(selectedTokens, tokensDir);
```

### Multiple Figma Files

Create separate sync scripts for different files:

```bash
FIGMA_FILE_KEY=abc123 node scripts/sync-figma-tokens.mjs
FIGMA_FILE_KEY=xyz789 node scripts/sync-figma-tokens.mjs
```

## API Reference

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `FIGMA_ACCESS_TOKEN` | Yes | Figma personal access token |
| `FIGMA_FILE_KEY` | Yes | Figma file identifier from URL |

### NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run figma:sync [prompt]` | Prompt-based interface for token management |
| `npm run figma:status` | Check configuration status |
| `npm run tokens:sync` | Fetch tokens from Figma |
| `npm run tokens:build` | Build Style Dictionary outputs |

## Related Documentation

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)

## Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check Figma API status: https://status.figma.com/
4. Open an issue on GitHub

## License

This integration is part of the lit-atoms project and follows the same ISC license.
