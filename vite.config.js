import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viteConfig = defineConfig({
  plugins: [vue()],
  server: {
    port: 5171,
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
});

export default viteConfig;
