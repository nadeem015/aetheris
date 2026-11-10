import { defineConfig } from "vite";

// Relative base so the build works on GitHub Pages (/aetheris/) and locally.
export default defineConfig({
  base: "./",
  esbuild: { jsx: "automatic" },
});
