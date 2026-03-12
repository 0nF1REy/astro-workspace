// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { viteCleaner } from "./configs/vite-cleaner.mjs";

export default defineConfig({
  output: "static",
  integrations: [react()],
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
