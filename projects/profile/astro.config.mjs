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

  // Redirecionamentos
  redirects: {
    "/": {
      destination: "/v1",
      status: 308,
    },
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
