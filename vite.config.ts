import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// `npm run analyze` builds in this mode and emits dist/stats.html (kept out of
// normal production builds so it isn't deployed).
export default defineConfig(({ mode, isSsrBuild }) => ({
  plugins: [
    react(),
    ...(mode === 'analyze'
      ? [visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: true })]
      : []),
  ],
  server: { host: true, port: 3000 },
  build: {
    // Split long-lived vendor code from frequently-changing app code so a content
    // edit doesn't bust the React/animation chunks in users' caches. Client build
    // only — during the SSR/prerender pass these packages are external.
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              motion: ['framer-motion'],
              icons: ['lucide-react'],
              scroll: ['lenis'],
            },
          },
        },
  },
}));
