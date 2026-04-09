import React from 'react';
import './Navigation.css';

function Navigation({ activeRoute, onNavigate }) {
  const routes = [
    { id: 'home', label: '🏠 Home' },
    { id: 'react', label: '⚛️ React' },
    { id: 'angular', label: '🅰️ Angular' },
    { id: 'next', label: '▲ Next.js' },
  ];

  return (
    <nav className="navigation">
      <ul className="nav-list">
        {routes.map((route) => (
          <li key={route.id}>
            <button
              className={`nav-button ${activeRoute === route.id ? 'active' : ''}`}
              onClick={() => onNavigate(route.id)}
            >
              {route.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
