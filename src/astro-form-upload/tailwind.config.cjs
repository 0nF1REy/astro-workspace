/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        gintama: {
          black: "#1a1a1b",
          dark: "#252526",
          cyan: "#4ca6b8",
          silver: "#f3f4f6",
        },
      },
      boxShadow: {
        "gintama-glow": "0 0 20px rgba(76, 166, 184, 0.3)",
      },
    },
  },
  plugins: [],
};
