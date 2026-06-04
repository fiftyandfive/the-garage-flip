import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: { port: 3100 },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        realtors: resolve(__dirname, 'realtors.html'),
        estate: resolve(__dirname, 'estate-cleanouts-orlando.html'),
      }
    }
  }
})
