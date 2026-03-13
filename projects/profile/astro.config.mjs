// @ts-check
import { defineConfig } from "astro/config";
import { viteCleaner } from "./configs/vite-cleaner.mjs";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "static",
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
