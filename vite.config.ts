
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'
import FullReload from "vite-plugin-full-reload"
// import removeClientDirective from './vite-plugins/remove-client-directive'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    include: [
      '@inertiajs/inertia',
      '@inertiajs/react',
      'react',
      'react-dom',
      'react/jsx-runtime',
      'framer-motion',
      'ahooks',
      'use-sync-external-store'
    ],
    force: true
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
    // removeClientDirective(),
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
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      '@inertiajs/react': path.resolve(__dirname, './node_modules/@inertiajs/react')
    }
  },
  build: {
    // Improve build performance
    target: 'esnext',
    minify: 'esbuild', // 使用 esbuild 替代 terser
    esbuildOptions: {
      legalComments: 'none',
      drop: ['console', 'debugger'],
    },
    // Better code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 确保 React 相关库在同一个 chunk 中
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/scheduler') ||
              id.includes('node_modules/use-sync-external-store')) {
            return 'react-vendor';
          }

          // Inertia 相关库
          if (id.includes('node_modules/@inertiajs')) {
            return 'inertia-vendor';
          }

          // UI 组件库
          if (id.includes('node_modules/@radix-ui') ||
              id.includes('node_modules/class-variance-authority') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge')) {
            return 'ui-vendor';
          }

          // 动画库
          if (id.includes('node_modules/framer-motion') ||
              id.includes('node_modules/motion')) {
            return 'animation-vendor';
          }

          // 其他 node_modules 按包名分组
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
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
