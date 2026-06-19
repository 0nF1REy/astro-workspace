// @ts-check
import { defineConfig } from "astro/config";
import { viteCleaner } from "./configs/vite-cleaner.mjs";

export default defineConfig({
  output: "static",
  vite: viteCleaner,
});
