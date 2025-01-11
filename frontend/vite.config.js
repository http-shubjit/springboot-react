import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
    proxy: {
      '/api': { // Adjust the path if your API endpoint is different
        target: 'http://localhost:8080', // Replace with your server's URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
