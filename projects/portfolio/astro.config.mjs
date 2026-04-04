// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { viteCleaner } from "./configs/vite-cleaner.mjs";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://alan-ryan.vercel.app",
  output: "static",
  integrations: [react(), sitemap()],
  adapter: vercel(),

  security: {
    csp: true,
  },

  server: {
    port: 4321,
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    ...viteCleaner,
  },
});
