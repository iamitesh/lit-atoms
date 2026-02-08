import React, { useState, useEffect } from 'react';
import './Widget.css';

function Widget() {
  const [token, setToken] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Read the demo auth token from localStorage (set by shell)
    const demoToken = localStorage.getItem('demoAuthToken');
    setToken(demoToken || 'No token found');
  }, []);

  return (
    <div className="widget">
      <div className="widget-header">
        <h2>React Widget Component</h2>
        <span className="badge">Federated Module</span>
      </div>
      
      <div className="widget-content">
        <div className="info-section">
          <h3>🔐 Authentication</h3>
          <div className="token-display">
            <strong>Demo Token:</strong>
            <code>{token}</code>
          </div>
          <p className="info-text">
            This token is shared across all microfrontends via localStorage
          </p>
        </div>

        <div className="info-section">
          <h3>🎯 Interactive Demo</h3>
          <div className="counter-demo">
            <p>Counter: <strong>{counter}</strong></p>
            <div className="button-group">
              <button onClick={() => setCounter(counter + 1)} className="btn btn-primary">
                Increment
              </button>
              <button onClick={() => setCounter(counter - 1)} className="btn btn-secondary">
                Decrement
              </button>
              <button onClick={() => setCounter(0)} className="btn btn-tertiary">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="info-section">
          <h3>📦 Module Federation Info</h3>
          <ul className="info-list">
            <li><strong>Remote Name:</strong> playgroundReact</li>
            <li><strong>Exposed Module:</strong> ./Widget</li>
            <li><strong>Port:</strong> 3001</li>
            <li><strong>Framework:</strong> React 18</li>
          </ul>
        </div>

        <div className="info-section success">
          <h3>✅ Status</h3>
          <p>React playground is running successfully!</p>
          <p className="small-text">This component can be used standalone or loaded dynamically by the shell app.</p>
        </div>
      </div>
    </div>
  );
}

export default Widget;
