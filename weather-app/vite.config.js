import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'weather-app',
  server: {
    port: 3001,
    open: true
  }
})
