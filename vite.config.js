import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset resolution for GitHub Pages, Vercel, and Netlify
  server: {
    port: 3000,
    host: true
  }
});
