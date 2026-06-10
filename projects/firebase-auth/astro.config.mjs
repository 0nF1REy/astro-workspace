// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://my-firebase-auth.vercel.app",
  output: "server",
  trailingSlash: "never",

  adapter: vercel({
    skewProtection: true,
  }),

  // Integrações
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/dashboard") &&
        !page.includes("/signin") &&
        !page.includes("/register") &&
        !page.includes("/404"),
    }),
  ],

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  // Markdown e syntax highlight
  markdown: {
    processor: satteri({
      features: {
        directive: true,
      },
    }),
    shikiConfig: {
      theme: "dracula",
      wrap: true,
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

  // Experimental (Rust compiler)
  experimental: {
    rustCompiler: true,
  },
});
