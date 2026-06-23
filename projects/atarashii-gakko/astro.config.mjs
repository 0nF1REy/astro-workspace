// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Site e roteamento
  site: "https://atarashii-gakko.vercel.app",
  output: "static",
  trailingSlash: "never",

  // Servidor de desenvolvimento
  server: {
    host: true,
    port: 4321,
  },

  // Dev Toolbar
  devToolbar: {
    enabled: false,
  },
});
