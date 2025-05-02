// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./site.config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  base: "/",

  devToolbar: {
    enabled: false
  },

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    remarkRehype: {
      footnoteLabel: "Notes"
    }
  }
});
