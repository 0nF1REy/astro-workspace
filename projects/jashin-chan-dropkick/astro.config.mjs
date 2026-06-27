import { defineConfig } from "astro/config";

export default defineConfig({
  // Site e roteamento
  site: "https://jashin-chan.vercel.app",
  output: "static",
  trailingSlash: "never",

  // Build e Otimização
  compressHTML: "jsx",

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  // Performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },

  // Dev Toolbar
  devToolbar: {
    enabled: false,
  },
});
