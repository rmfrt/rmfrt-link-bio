// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = (process.env.PUBLIC_SITE_URL || "https://preview.rmfrt.xyz").replace(/\/+$/, "");

export default defineConfig({
  site,
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()]
  }
});
