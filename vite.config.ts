
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'
import FullReload from "vite-plugin-full-reload"

export default defineConfig({
  optimizeDeps: {
    include: ['@inertiajs/inertia', 'react', 'react-dom', 'framer-motion', 'ahooks']
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
    mkcert(),
    FullReload(["config/routes.rb", "app/views/**/*", "app/resources/**/*.rb", "app/frontend/**/**/.tsx"], { delay: 500 }),
  ],
  server: {
    cors: {
      origin: '*'
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['!**/node_modules/**']
    },
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      overlay: true,
      clientPort: 443,
      timeout: 30000,
    }
  },
  build: {
    // Improve build performance
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Better code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for React, React DOM, and other large libraries
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'react-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor'
            }
            // Group other node_modules by their package name
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        // Ensure chunk size is reasonable
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    // Enable source maps for production debugging if needed
    sourcemap: false,
  }
})
