import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

if (import.meta.env.MODE === 'development') {
  performance.mark('app-init-start');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.MODE === 'development') {
  performance.mark('app-init-end');
}