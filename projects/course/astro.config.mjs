// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

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
  integrations: [react(), mdx()],

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  // Redirecionamentos
  redirects: {
    "/inicio": "/",
    "/componentes": "/components",
    "/postagens": "/blogs",
  },

  // Imagens remotas
  image: {
    remotePatterns: [{ protocol: "https", hostname: "i.pravatar.cc" }],
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
});
