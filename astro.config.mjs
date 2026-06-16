// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare(),
  site: "https://absurd.industries",

  integrations: [
    tailwind(),
    vue(),
  ],

  vite: {
    define: {
      __DEBUG__: JSON.stringify(process.env.NODE_ENV !== "production"),
    },
  },
});
