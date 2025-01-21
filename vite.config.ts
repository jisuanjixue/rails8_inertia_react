import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'
import reloadOnChange from "vite-plugin-full-reload";

export default defineConfig({
  optimizeDeps: {
    include: ['@inertiajs/inertia']
  },
  plugins: [
    ViteRails({
      fullReload: {
        additionalPaths: [
          'config/routes.rb',
          'app/controllers/**/*',
          'app/models/**/*'
        ]
      }
    }),
    react({
      // 确保热更新配置正确
      include: '**/*.tsx',
      exclude: /node_modules/,
      jsxRuntime: "classic"
    }),
    mkcert(),
    reloadOnChange(["config/routes.rb", "app/views/**/*", "app/resources/**/*.rb", "app/frontend/**/**/.tsx"], { delay: 200 }),
  ],
  server: {
    cors: {
      origin: '*'
    },
    watch: {
      usePolling: true
    },
    hmr: {
      host: 'localhost',
      overlay: true,
      clientPort: 443
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
