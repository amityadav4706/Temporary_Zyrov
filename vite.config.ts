import react from '@vitejs/plugin-react'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'

const sourceOnlyAssets = [
  'Name Logo.png',
  'Zyrov_Logo.png',
  'zyrov-gold-logo.png',
  'zyrov-cap.png',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'exclude-source-only-assets',
      apply: 'build',
      writeBundle(options) {
        if (!options.dir) return
        sourceOnlyAssets.forEach((asset) => rmSync(join(options.dir!, asset), { force: true }))
      },
    },
  ],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
})
