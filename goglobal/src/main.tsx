import React from 'react';
import ReactDOM from 'react-dom/client';
import ModernApp from './ModernApp.jsx';
import './index.css';
// Figma-derived styles (lightweight augmentations)
import './figma.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ModernApp />
  </React.StrictMode>,
);
