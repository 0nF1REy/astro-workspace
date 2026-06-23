// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://my-book-bites.vercel.app",
  output: "static",
  trailingSlash: "never",
  integrations: [react()],

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
