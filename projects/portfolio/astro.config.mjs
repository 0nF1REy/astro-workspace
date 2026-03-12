// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  server: {
    port: 4321,
  },

  devToolbar: {
    enabled: false,
  },

  integrations: [react()],
  output: "server",
  adapter: vercel(),
});
