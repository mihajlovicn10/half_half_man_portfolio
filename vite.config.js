import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
    watch: {
      usePolling: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    cache: true,
    minify: 'esbuild',
    cssMinify: true,
  },
  // Add trailing slash handling for better SEO
  preview: {
    port: 4173,
    strictPort: true,
  },
})
