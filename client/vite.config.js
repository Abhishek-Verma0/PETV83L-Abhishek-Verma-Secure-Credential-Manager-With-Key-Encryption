import { defineConfig,loadEnv, preview } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(), "");

  const config = {
    plugins: [react()],
    server: {
      hsot: true,
      port: process.env.PORT,
      strictPort: false,

      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOroigin: true,
          secure: false,
        },
      },
    },
    preview: {
      host: true,
      port: process.env.PORT,
      strictPort: false,
    },
  };
  return config;
})
