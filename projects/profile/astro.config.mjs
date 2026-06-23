// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://alan-ryan-profile.vercel.app",
  output: "static",
  trailingSlash: "never",

  security: {
    csp: true,
  },

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
