import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite 設定：超精簡，只啟用 React 支援
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // npm run dev 時自動開啟瀏覽器
  },
});
