import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';
import './index.css';

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Single-page SSG: the app is prerendered to static HTML at build time and
// hydrated on the client. The second callback runs in the browser only.
// (The hero poster — the LCP element — is preloaded statically in index.html.)
export const createRoot = ViteReactSSG(app, ({ isClient }) => {
  if (!isClient) return;

  // Report Core Web Vitals (own chunk, off the critical path).
  import('./reportWebVitals').then(({ reportWebVitals }) => reportWebVitals());
});
