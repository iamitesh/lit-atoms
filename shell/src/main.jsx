import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Set demo auth token for microfrontends to consume
localStorage.setItem('demoAuthToken', 'demo-token-123');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
