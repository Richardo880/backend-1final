import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // 👉 Agregá esta línea
import './index.css'; // 👉 Agregá esta línea

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
