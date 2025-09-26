import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";


export default defineConfig({
  plugins: [vue()],
  serve: {
    port: 5173,
    strictPort: false
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  }
})
