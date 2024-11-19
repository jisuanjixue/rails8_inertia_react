import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
    RubyPlugin(),
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
