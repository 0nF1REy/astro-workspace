// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://my-lifelong-learning.vercel.app",
  output: "static",
  trailingSlash: "never",

  adapter: vercel({
    skewProtection: true,
  }),

  // Integrações
  integrations: [react(), mdx(), sitemap()],

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
});
