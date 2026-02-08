# Testing Module Federation Microfrontends

## Important: Development vs Production Mode

### Module Federation Limitation in Dev Mode

The `@originjs/vite-plugin-federation` plugin used in this demo **does not generate remote entry files in development mode**. This means:

- ✅ **Shell app loads correctly** in dev mode
- ✅ **Navigation works** in dev mode
- ✅ **Error handling displays** when remotes aren't available
- ❌ **Remote modules cannot be loaded** in dev mode (remoteEntry.js files not generated)

### Testing in Development Mode

When running `npm run dev`, you can test:
- Shell application loads
- Navigation is present
- Error messages display correctly
- Each playground works as a standalone app

### Testing Module Federation (Production Mode)

To test the actual Module Federation functionality, you must **build** the applications:

```bash
# Build all applications
cd shell && npm run build && npm run preview &
cd playground/react && npm run build && npm run preview &
cd playground/next && npm run build && npm run preview &

# Note: Angular requires additional setup for Module Federation
```

## Running Tests

### Quick Test (Shell Only)
```bash
# Start shell
cd shell && npm run dev

# Visit http://localhost:3000
# Verify: Shell loads, navigation works, error messages display
```

### Full Integration Test (Requires Build)
```bash
# Build and preview all apps
npm run mfe:build-all  # If script exists
npm run mfe:preview-all

# Run Playwright tests
npm run test:mfe
```

## Current Test Status

### What's Tested ✅
1. **Shell App Loads** - Verifies shell application starts correctly
2. **Navigation Exists** - All navigation buttons are present
3. **Home Page Content** - Welcome message and token display
4. **Error Handling** - Proper error messages when remotes unavailable
5. **Standalone Apps** - Each playground works independently

### What Requires Build 🏗️
1. **React Remote Loading** - Module Federation from React playground
2. **Angular Remote Loading** - Module Federation from Angular playground  
3. **Next.js Remote Loading** - Module Federation from Next.js playground
4. **Token Sharing** - Across federated modules
5. **Dynamic Loading** - Without page reload

## Test Files

- `tests/microfrontend/integration.spec.js` - All integration tests
- `playwright.config.mfe.js` - Test configuration

## Known Limitations

1. **Vite Module Federation in Dev Mode**: Remote entries not generated
2. **Angular Setup**: Requires Webpack configuration
3. **Port Conflicts**: Ensure ports 3000-3003 are available

## Workarounds

### Option 1: Test Individual Apps
Each playground can be tested standalone in dev mode.

### Option 2: Build for Integration Testing
Build all apps before running integration tests.

### Option 3: Mock Remote Modules
Create mock implementations for development testing.

## References

- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Docs](https://module-federation.github.io/)
- Issue: Remote entries only generated in build mode
