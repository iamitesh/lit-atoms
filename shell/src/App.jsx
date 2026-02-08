import React, { useState } from 'react';
import Navigation from './components/Navigation';
import RemoteLoader from './components/RemoteLoader';
import './App.css';

function App() {
  const [activeRoute, setActiveRoute] = useState('home');

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Microfrontend Shell</h1>
        <p className="subtitle">Module Federation Demo with React, Angular & Next.js Playgrounds</p>
      </header>
      
      <Navigation activeRoute={activeRoute} onNavigate={setActiveRoute} />
      
      <main className="app-main">
        {activeRoute === 'home' && (
          <div className="welcome">
            <h2>Welcome to the Microfrontend Demo</h2>
            <p>This shell application demonstrates Module Federation by loading playgrounds from:</p>
            <ul>
              <li><strong>React Playground</strong> - Port 3001</li>
              <li><strong>Angular Playground</strong> - Port 3002</li>
              <li><strong>Next.js Playground</strong> - Port 3003</li>
            </ul>
            <p>Use the navigation above to load different playgrounds dynamically without page reload.</p>
            <div className="token-info">
              <strong>Shared Token:</strong> {localStorage.getItem('demoAuthToken')}
            </div>
          </div>
        )}
        
        {activeRoute === 'react' && (
          <RemoteLoader
            remoteName="playgroundReact"
            moduleName="./Widget"
            fallback={<div className="loading">Loading React Playground...</div>}
            error={
              <div className="error">
                <h3>React Playground Not Available</h3>
                <p>Make sure the React playground is running on port 3001</p>
                <code>cd playground/react && npm run dev</code>
              </div>
            }
          />
        )}
        
        {activeRoute === 'angular' && (
          <RemoteLoader
            remoteName="playgroundAngular"
            moduleName="./Widget"
            fallback={<div className="loading">Loading Angular Playground...</div>}
            error={
              <div className="error">
                <h3>Angular Playground Not Available</h3>
                <p>Make sure the Angular playground is running on port 3002</p>
                <code>cd playground/angular && npm run dev</code>
              </div>
            }
          />
        )}
        
        {activeRoute === 'next' && (
          <RemoteLoader
            remoteName="playgroundNext"
            moduleName="./Widget"
            fallback={<div className="loading">Loading Next.js Playground...</div>}
            error={
              <div className="error">
                <h3>Next.js Playground Not Available</h3>
                <p>Make sure the Next.js playground is running on port 3003</p>
                <code>cd playground/next && npm run dev</code>
              </div>
            }
          />
        )}
      </main>
      
      <footer className="app-footer">
        <p>Microfrontend Shell • Module Federation • No iframes</p>
      </footer>
    </div>
  );
}

export default App;
