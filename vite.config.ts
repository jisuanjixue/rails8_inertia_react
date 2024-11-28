import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'

export default defineConfig({
  plugins: [
    ViteRails({
      fullReload: {
        additionalPaths: [
          'config/routes.rb',
          'app/frontend/pages/**/*',
          'app/controllers/**/*',
          'app/models/**/*'
        ],
      }
    }),
    basicSsl(),
    react(),
    mkcert()
  ],
  server: {
    cors: {
      origin: '*',
    },
    https: true,
    hmr: {
      protocol: 'wss',
    },
  },
})
