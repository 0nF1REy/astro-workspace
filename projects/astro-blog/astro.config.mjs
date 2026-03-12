// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { viteCleaner } from "./configs/vite-cleaner.mjs";

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  output: "static",
  vite: {
    ...viteCleaner,
  },
});
