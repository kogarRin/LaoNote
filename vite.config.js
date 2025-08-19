import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  serve: {
    port: 5173,
    strictPort: false
  },
  build:{
    rollupOptions: {
      input:{
        preload: './electron/preload.js'
      },
      output:{
        format: 'cjs',
        entryFileNames: '[name].cjs'
      }
    },
    outDir: 'dist-electron',
    emptyDir: true
  },
  base: './',
})
