import React from 'react';
import Widget from './Widget';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ React Playground</h1>
        <p>Standalone React Application - Can also be loaded as a microfrontend</p>
      </header>
      <main className="app-main">
        <Widget />
      </main>
    </div>
  );
}

export default App;
