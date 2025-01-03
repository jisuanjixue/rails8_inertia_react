import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl';
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'

export default defineConfig({
  optimizeDeps: {
    include: ["@inertiajs/inertia"],
  },
  plugins: [
    ViteRails({
      fullReload: {
        additionalPaths: [
          'config/routes.rb',
          'app/controllers/**/*',
          'app/models/**/*'
        ],
      }
    }),
    basicSsl(),
    reactRefresh({
      parserPlugins: ['classProperties', 'classPrivateProperties'],
      // Exclude storybook stories and node_modules
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      // Only .tsx files
      include: '**/*.tsx'
    }),
    react({
        // 确保热更新配置正确
        include: '**/*.tsx',
        exclude: /node_modules/
    }),
    mkcert(),
  ],
  server: {
    cors: {
      origin: '*',
    },
    watch: {
      usePolling: true
    },
    hmr: {
      host: "localhost",
      overlay: true,
      clientPort: 3100,
    },
  },
  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
}
})
