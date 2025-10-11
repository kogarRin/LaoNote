import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";


export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    strictPort: false
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname)
    }
  }
})
