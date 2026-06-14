import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
<<<<<<< HEAD
    port: 5174,
=======
    port: 5173,
>>>>>>> 36b1c8de34196dcf27f65c3dda2813cca12f314c
    host: true,
    strictPort: true,
    allowedHosts: ['preformed-cuddle-exit.ngrok-free.dev']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
