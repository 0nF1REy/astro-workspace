// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { satteri } from "@astrojs/markdown-satteri";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://alan-ryan-profile.vercel.app",
  output: "static",
  trailingSlash: "never",
  adapter: vercel(),

  security: {
    csp: true,
  },

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
