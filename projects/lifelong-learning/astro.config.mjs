// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://meu-projeto-astro.com",
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
  trailingSlash: "never",

  // Integrações
  integrations: [react(), mdx(), sitemap(), db()],

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  // Redirecionamentos
  redirects: {
    "/inicio": { destination: "/", status: 301 },
    "/componentes": { destination: "/components", status: 301 },
    "/postagens": { destination: "/blog", status: 301 },
    "/manutencao": { destination: "/status", status: 302 },
  },

  // Imagens remotas
  image: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "cdn.myanimelist.net" },
      { protocol: "https", hostname: "images.myanimelist.net" },
      { protocol: "https", hostname: "ik.imagekit.io" },
    ],
  },

  // Markdown e syntax highlight
  markdown: {
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
