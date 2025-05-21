
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import ViteRails from 'vite-plugin-rails'
import FullReload from "vite-plugin-full-reload";
import path from 'path'

// 创建一个插件来修复 ahooks 库的问题

export default defineConfig({
  optimizeDeps: {
    include: [
      '@inertiajs/inertia',
      '@inertiajs/react',
      'react',
      'react-dom',
      'ahooks'
    ],
    exclude: ['use-callback-ref']
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
    FullReload(["config/routes.rb", "app/views/**/*", "app/resources/**/*.rb", "app/frontend/**/**/.tsx"], { delay: 1000 }),
  ],
  server: {
    cors: {
      origin: '*'
    },
    watch: {
      usePolling: true,
      interval: 100,    // 降低轮询间隔
  ignored: ['!**/node_modules/**']
    },
    hmr: {
      protocol: 'wss', // 添加这行
      host: 'localhost',
      overlay: true,
      clientPort: 443,
      timeout: 30000, // 增加超时时间
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
