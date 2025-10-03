import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// PostCSS configuration is handled in postcss.config.cjs
export default defineConfig({
  plugins: [vue()],
  server: {
    host: 'localhost',
    port: 8080,
    cors: true
  }
})
