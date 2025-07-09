import { defineConfig, loadEnv, preview } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const config = {
    plugins: [react()],
    server: {
      host: true,
      port: process.env.VITE_PORT || 5173,
      strictPort: false,
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      host: true,
      port: process.env.VITE_PORT || 5173,
      strictPort: false,
    },
    build: {
      outDir: "dist",
      target: "esnext",
      minify: false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
  return config;
});
