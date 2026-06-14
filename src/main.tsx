import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { reportWebVitals } from './reportWebVitals';
import lcpImage from './assets/mudigere4.webp';

// Preload the LCP image (the first, full-viewport hero slide) at high priority,
// before React mounts, so the fetch starts as early as possible.
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
