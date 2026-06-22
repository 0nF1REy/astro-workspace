import { defineConfig } from "astro/config";

export default defineConfig({
  // Site e roteamento
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
