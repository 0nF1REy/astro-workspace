import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // Site e roteamento
  site: "https://alan-ryan.vercel.app",
  output: "static",
  trailingSlash: "never",
  adapter: vercel(),

  // Integrações
  integrations: [react(), sitemap(), mdx()],

  security: {
    csp: true,
  },

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  build: {
    inlineStylesheets: "never",
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
