import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/blog': {
        target: 'http://localhost:8000', // Django backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
