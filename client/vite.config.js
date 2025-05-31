import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/coze-api': {
        target: 'https://api.coze.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/coze-api/, ''),
        secure: false,
      },
    },
  },
});
