import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FavoritosProvider } from './FavoritosContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FavoritosProvider>
      <App />
    </FavoritosProvider>
  </React.StrictMode>
);
