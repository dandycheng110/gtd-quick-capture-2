import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// React 18 標準寫法：createRoot 建立 root，然後 render
// StrictMode 開發時雙重執行某些函式，幫助抓到副作用問題
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
