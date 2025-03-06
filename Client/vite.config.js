import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses (useful if accessing from another device)
    port: 5173,
    hmr: {
      host: 'localhost', // or use your local network IP if needed
      protocol: 'ws', // use 'wss' if you are running under HTTPS
    },
  },
})
