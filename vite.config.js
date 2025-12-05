import tailwindcss from '@tailwindcss/vite';

// vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // All /auth calls go through Vite → no CORS!
      '/auth': {
        target: 'https://backend-nuit-dinfo-2025.vercel.app',
        changeOrigin: true,
        secure: true,
      },
      '/api': {
        target: 'https://backend-nuit-dinfo-2025.vercel.app',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})