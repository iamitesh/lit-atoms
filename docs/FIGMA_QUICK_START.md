# Figma Integration Quick Start

Get up and running with Figma to Style Dictionary sync in 5 minutes!

## 1. Get Your Figma Token

1. Go to https://www.figma.com/settings
2. Scroll to "Personal access tokens"
3. Click "Create new token"
4. Name it "lit-atoms-sync"
5. Copy the token

## 2. Get Your File Key

1. Open your Figma file
2. Copy the file key from the URL:
   ```
   https://www.figma.com/file/ABC123XYZ/...
                              ↑ this part
   ```

## 3. Configure

```bash
# Copy the example file
cp .env.example .env

# Edit .env and paste your credentials
nano .env  # or use your favorite editor
```

Your `.env` should look like:
```env
FIGMA_ACCESS_TOKEN=figd_abc123xyz...
FIGMA_FILE_KEY=ABC123XYZ
```

## 4. Test Configuration

```bash
npm run figma:status
```

You should see all green checkmarks ✅

## 5. Sync!

```bash
npm run figma:sync
```

This will:
1. ✅ Fetch tokens from Figma
2. ✅ Save to `tokens/` directory
3. ✅ Build CSS, JS, TS, and JSON outputs
4. ✅ Save to `build/tokens/` directory

## 6. Use Your Tokens

### In CSS:
```css
@import '../build/tokens/css/variables.css';

.button {
  background: var(--color-primary-main);
  padding: var(--spacing-md);
}
```

### In JavaScript/TypeScript:
```javascript
import tokens from '../build/tokens/js/tokens.js';

const primaryColor = tokens.color.primary.main;
```

## Next Steps

- Read the [full documentation](./FIGMA_INTEGRATION.md)
- Set up your Figma file with proper token structure
- Integrate tokens into your existing theme system
- Automate sync in your CI/CD pipeline

## Common Commands

```bash
# Sync and build
npm run figma:sync

# Just sync from Figma
npm run figma:sync sync

# Just build tokens
npm run figma:sync build

# Check configuration
npm run figma:status

# Get help
npm run figma:sync help
```

## Troubleshooting

### "FIGMA_ACCESS_TOKEN not set"
- Make sure you created the `.env` file
- Check that it's in the project root
- Verify the token is on the right line

### "403 Forbidden"
- Token is invalid or expired
- Generate a new token from Figma settings

### "404 Not Found"
- File key is incorrect
- Make sure you copied the right part from the URL

### Empty tokens
- Your Figma file needs styles or variables
- Add some color/text/effect styles in Figma

## Need Help?

Check the [full documentation](./FIGMA_INTEGRATION.md) for detailed guides and troubleshooting.
