// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // Site e roteamento
  site: "https://p5js-workspace.vercel.app",
  output: "static",
  trailingSlash: "never",

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
