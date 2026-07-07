import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Osobny build serwerowy dla prerenderu (SSG). Produkuje dist/server/entry-server.js,
// który scripts/prerender.js importuje i renderuje do statycznego HTML.
// UWAGA: brak pluginu cloudflare() — ten config buduje tylko bundle node'owy.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    ssr: true,
    outDir: 'dist/server',
    rollupOptions: {
      input: 'src/entry-server.jsx',
      output: {
        entryFileNames: 'entry-server.js',
      },
    },
  },
  // wouter musi być zbundlowany do outputu SSR (prerender importuje entry-server.js).
  ssr: {
    noExternal: ['wouter'],
  },
})
