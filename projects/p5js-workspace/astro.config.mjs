// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import { viteCleaner } from "./configs/vite-cleaner.mjs";

export default defineConfig({
  adapter: vercel(),
  output: "static",
  vite: viteCleaner,
});
