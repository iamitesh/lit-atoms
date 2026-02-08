import React from 'react';
import Widget from './components/Widget';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>▲ Next.js-style Playground</h1>
        <p>Next.js-inspired Application - Can also be loaded as a microfrontend</p>
      </header>
      <main className="app-main">
        <Widget />
      </main>
    </div>
  );
}

export default App;
