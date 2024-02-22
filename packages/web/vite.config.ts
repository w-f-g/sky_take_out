import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { compression } from 'vite-plugin-compression2'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    ViteImageOptimizer(),
    compression({
      deleteOriginalAssets: true,
      exclude: [
        /\.(jpg|jpeg|png|gif|svg|webp)$/,
        /\.html$/,
      ]
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/ws': {
        target: 'ws://127.0.0.1:8081',
        changeOrigin: true,
        ws: true,
      }
    },
  },
  build: {
    outDir: resolve(__dirname, '../../dist/sky'),
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (chunkInfo) => {
          const { name } = chunkInfo
          if (name?.endsWith('.css')) {
            return 'css/[name].[hash].css'
          }
          const images = ['.jpg', '.png', '.svg', '.gif', '.jpeg', '.webp']
          const some = images.some(x => name?.endsWith(x))
          if (some) {
            return 'images/[name].[hash].[ext]'
          }
          return 'assets/[name].[hash].[ext]'
        },
        manualChunks : {
          dayjs: ['dayjs'],
          echarts: ['echarts'],
          request: ['axios'],
          '@ant-design_icons-vue': ['@ant-design/icons-vue'],
          'ant-design-vue': ['ant-design-vue'],
        },
      },
    },
  },
})
