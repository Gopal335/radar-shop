import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const devBackend = env.VITE_DEV_BACKEND || 'http://localhost:5000'

  return defineConfig({
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false
    },
    server: {
      proxy: {
        '^/api/.*': {
          target: devBackend,
          changeOrigin: true,
          secure: false
        }
      }
    }
  })
}