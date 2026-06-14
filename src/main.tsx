import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';
import './index.css';
import lcpImage from './assets/mudigere4.webp';

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Single-page SSG: the app is prerendered to static HTML at build time and
// hydrated on the client. The second callback runs in the browser only.
export const createRoot = ViteReactSSG(app, ({ isClient }) => {
  if (!isClient) return;

  // Preload the LCP hero image at high priority.
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'image';
  preload.href = lcpImage;
  preload.setAttribute('fetchpriority', 'high');
  document.head.appendChild(preload);

  // Report Core Web Vitals (own chunk, off the critical path).
  import('./reportWebVitals').then(({ reportWebVitals }) => reportWebVitals());
});
