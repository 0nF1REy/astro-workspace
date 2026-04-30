import { defineConfig } from "astro/config";

export default defineConfig({
  compressHTML: "jsx",

  server: {
    port: 4321,
  },

  devToolbar: {
    enabled: false,
  },
});
