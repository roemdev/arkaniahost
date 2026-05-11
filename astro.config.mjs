// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  site: "https://arkaniahost.com", // 🔧 Cambia por tu dominio real

  vite: {
    plugins: [tailwindcss()],
  },
});
