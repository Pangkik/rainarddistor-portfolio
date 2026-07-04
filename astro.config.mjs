// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.raingoesaway.com",
  // Preview harness assigns a port via the PORT env var; Astro doesn't read it natively.
  server: { port: process.env.PORT ? Number(process.env.PORT) : 4321 },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
});
