
//arquivo index.js carrega o react que carrega o dom que é a arvore de components usados.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// E injeta o App dentro da div root, ele da um getElementById('root') ou seja localiza essa div no index.html e injeta nessa na div root a rederização do componete react vá para o App.js
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


