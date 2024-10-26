import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true,
    }),
    react(),
  ],

  build: {
    outDir: "dist", // Ensure the output directory is set correctly
    emptyOutDir: true, // Clears the output folder before each build
  },
});
