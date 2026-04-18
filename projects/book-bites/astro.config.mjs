// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://my-book-bites.vercel.app",
  output: "static",
  integrations: [react()],

  server: {
    port: 4321,
  },

  devToolbar: {
    enabled: false,
  },
});
