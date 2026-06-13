import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { reportWebVitals } from './reportWebVitals';
import lcpImage from './assets/mudigere1.webp';

// Preload the LCP image (full-viewport scenery backdrop + first hero slide are
// the same file) at high priority, before React mounts, so the fetch starts as
// early as possible.
const preload = document.createElement('link');
preload.rel = 'preload';
preload.as = 'image';
preload.href = lcpImage;
preload.setAttribute('fetchpriority', 'high');
document.head.appendChild(preload);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
