import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // ─── Dev proxy ────────────────────────────────────────────────────────────
    // Routes /contact (and any other /api/* calls) to your Express server.
    // This avoids CORS issues in development and matches the API_BASE logic
    // in Contact.jsx (where VITE_API_URL is empty in dev, so the prefix is '').
    proxy: {
      '/contact': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})