# Microfrontend Demo

A minimal, secure microfrontend demonstration that composes three frontend applications (React, Angular, and Next.js-style) into a single shell using **Webpack 5 Module Federation** - without using iframes.

## 🎯 Overview

This demo showcases:
- **Shell App** (React + Vite): Hosts and orchestrates microfrontends
- **React Playground** (Port 3001): React microfrontend exposing a widget component
- **Angular Playground** (Port 3002): Angular microfrontend exposing a widget component  
- **Next.js Playground** (Port 3003): Next.js-style microfrontend exposing a widget component

All applications use Module Federation to share components dynamically at runtime without page reloads.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Shell App (Port 3000)                │
│                     React + Vite + Module Federation        │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   Home   │  │  React   │  │ Angular  │  │  Next.js │  │
│  │          │  │  Widget  │  │  Widget  │  │  Widget  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
         │              │              │              │
         │              │              │              │
         ▼              ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │          │  │  React   │  │ Angular  │  │ Next.js  │
    │   Home   │  │  Remote  │  │  Remote  │  │  Remote  │
    │          │  │ (3001)   │  │ (3002)   │  │ (3003)   │
    └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Module Federation Setup

- **Shell (Host)**: Dynamically imports remote components from playgrounds
- **Playgrounds (Remotes)**: Expose widget components via Module Federation
- **Shared Dependencies**: React and React-DOM are shared across all apps
- **Token Sharing**: Uses `localStorage` for demo authentication token

## 📦 Project Structure

```
lit-atoms/
├── shell/                          # Shell host application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx      # Navigation bar
│   │   │   └── RemoteLoader.jsx    # Dynamic module loader
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   └── vite.config.js              # Module Federation config
│
├── playground/
│   ├── react/                      # React microfrontend
│   │   ├── src/
│   │   │   ├── Widget.jsx          # Exposed component
│   │   │   └── App.jsx
│   │   ├── package.json
│   │   └── vite.config.js          # Exposes ./Widget
│   │
│   ├── angular/                    # Angular microfrontend
│   │   ├── src/
│   │   │   └── app/
│   │   │       └── widget/         # Exposed component
│   │   ├── package.json
│   │   ├── angular.json
│   │   └── webpack.config.js       # Module Federation config
│   │
│   └── next/                       # Next.js-style microfrontend
│       ├── src/
│       │   └── components/
│       │       └── Widget.jsx      # Exposed component
│       ├── package.json
│       └── vite.config.js          # Exposes ./Widget
│
└── package.json                    # Root workspace scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamitesh/lit-atoms.git
   cd lit-atoms
   ```

2. **Install dependencies for all microfrontends**
   ```bash
   # Install shell dependencies
   cd shell && npm install && cd ..
   
   # Install React playground dependencies
   cd playground/react && npm install && cd ../..
   
   # Install Angular playground dependencies (optional - if testing Angular)
   cd playground/angular && npm install && cd ../..
   
   # Install Next playground dependencies
   cd playground/next && npm install && cd ../..
   ```

   Or use the convenience script:
   ```bash
   npm run mfe:install
   ```

### Running the Demo

**Option 1: Run apps individually (recommended for development)**

```bash
# Terminal 1: Start the shell app
npm run mfe:shell
# or
cd shell && npm run dev

# Terminal 2: Start React playground
npm run mfe:react
# or
cd playground/react && npm run dev

# Terminal 3: Start Angular playground (optional)
npm run mfe:angular
# or
cd playground/angular && npm run dev

# Terminal 4: Start Next playground
npm run mfe:next
# or
cd playground/next && npm run dev
```

**Option 2: Run all apps at once (requires all to be running)**

```bash
npm run mfe:all
```

### Accessing the Applications

Once all apps are running:

- **Shell App**: http://localhost:3000
- **React Playground**: http://localhost:3001
- **Angular Playground**: http://localhost:3002
- **Next.js Playground**: http://localhost:3003

Open the Shell App in your browser and navigate between the different microfrontends using the navigation bar.

## 🧪 Testing

### Manual Testing

1. **Start the Shell and React playground**:
   ```bash
   npm run mfe:shell  # Terminal 1
   npm run mfe:react  # Terminal 2
   ```

2. **Open http://localhost:3000**

3. **Verify**:
   - Shell app loads successfully
   - Home page displays welcome message and shared token
   - Click "React" navigation - React widget loads dynamically
   - React widget displays the shared `demoAuthToken`
   - Counter functionality works (increment/decrement/reset)

4. **Start additional playgrounds**:
   ```bash
   npm run mfe:next   # Terminal 3
   npm run mfe:angular # Terminal 4 (if testing Angular)
   ```

5. **Verify**:
   - Click "Next.js" navigation - Next widget loads dynamically
   - Click "Angular" navigation - Angular widget loads dynamically
   - All widgets can access the shared token
   - No page reload occurs when switching between widgets

### Automated Testing

Playwright tests are included to verify the microfrontend integration:

```bash
npm run mfe:test
```

Tests verify:
- ✅ Shell app loads correctly
- ✅ React playground loads and mounts in shell
- ✅ Angular playground loads and mounts in shell
- ✅ Next.js playground loads and mounts in shell
- ✅ Token sharing works across all playgrounds
- 📸 Screenshots are captured for visual verification

## ✅ Acceptance Criteria

- [x] **No iframes used** - All microfrontends are integrated as JavaScript modules
- [x] **Easy local setup** - Single install command and simple run scripts
- [x] **Dynamic loading** - Microfrontends load on-demand without page reload
- [x] **Shared state** - Demo auth token is accessible across all apps
- [x] **Module Federation** - Uses Vite's Module Federation plugin
- [x] **Framework interoperability** - React, Angular, and Next.js work together
- [x] **Standalone operation** - Each playground can run independently
- [x] **Port configuration** - Shell:3000, React:3001, Angular:3002, Next:3003

## 🛠️ Technology Stack

### Shell App
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Module Federation**: `@originjs/vite-plugin-federation`
- **Routing**: Client-side navigation (no router library)

### React Playground
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Federation**: Exposes `./Widget` component

### Angular Playground
- **Framework**: Angular 19
- **Build Tool**: Angular CLI + Webpack
- **Federation**: `@angular-architects/module-federation`
- **Exposes**: `./Widget` component

### Next.js Playground
- **Framework**: React 18 (Next.js-style)
- **Build Tool**: Vite 5
- **Federation**: Exposes `./Widget` component

## 🔒 Security Notes

### Demo-Level Security

This is a demonstration project with simplified security:

- ✅ **No iframes**: Reduces XSS attack surface
- ✅ **Updated Angular**: Uses Angular 19.2.18+ with critical security patches
  - Fixed XSRF Token Leakage via Protocol-Relative URLs
  - Fixed XSS Vulnerability via Unsanitized SVG Script Attributes
  - Fixed Stored XSS Vulnerability via SVG Animation, SVG URL and MathML Attributes
- ⚠️ **localStorage tokens**: Demo only - not production-ready
- ⚠️ **No CSP headers**: Add Content Security Policy for production
- ⚠️ **CORS**: Currently permissive for local development

### Production Recommendations

For production deployment:

1. **Authentication**: Replace localStorage with secure token management (HTTP-only cookies, secure session storage)
2. **CSP Headers**: Implement Content Security Policy headers
3. **CORS**: Configure strict CORS policies
4. **HTTPS**: Serve all apps over HTTPS
5. **Validation**: Add input validation and sanitization
6. **Secrets Management**: Never store secrets in code (use environment variables)

## 📝 Module Federation Details

### How It Works

1. **Shell configures remotes** in `vite.config.js`:
   ```javascript
   remotes: {
     playgroundReact: 'http://localhost:3001/assets/remoteEntry.js',
     playgroundAngular: 'http://localhost:3002/remoteEntry.js',
     playgroundNext: 'http://localhost:3003/assets/remoteEntry.js',
   }
   ```

2. **Playgrounds expose components**:
   ```javascript
   exposes: {
     './Widget': './src/Widget.jsx',  // React
     './Widget': './src/app/widget/widget.component.ts',  // Angular
     './Widget': './src/components/Widget.jsx',  // Next
   }
   ```

3. **Shell loads remotes dynamically**:
   ```javascript
   const module = await import('playgroundReact/Widget');
   const Component = module.default;
   ```

### Shared Dependencies

React and React-DOM are shared across all apps to:
- Reduce bundle sizes
- Ensure single React instance
- Enable component interoperability

## 🐛 Troubleshooting

### Common Issues

**Problem**: "Failed to fetch remote module"
**Solution**: Ensure the playground app is running on the correct port

**Problem**: "React version mismatch"
**Solution**: All apps must use the same React version (18.2.0)

**Problem**: Angular app won't start
**Solution**: Angular setup requires additional dependencies. Install with `cd playground/angular && npm install`

**Problem**: Port already in use
**Solution**: Stop any existing processes on ports 3000-3003 or modify port numbers in config files

### Debug Mode

Enable verbose logging by setting in browser console:
```javascript
localStorage.setItem('debug', 'mfe:*');
```

## 📚 Additional Resources

- [Module Federation Documentation](https://module-federation.github.io/)
- [Vite Plugin Federation](https://github.com/originjs/vite-plugin-federation)
- [Angular Module Federation](https://github.com/angular-architects/module-federation-plugin)
- [Microfrontend Best Practices](https://martinfowler.com/articles/micro-frontends.html)

## 🤝 Contributing

This is a demonstration project. Feel free to fork and experiment!

## 📄 License

ISC

---

**Built with ❤️ as a demonstration of Module Federation and Microfrontend architecture**
