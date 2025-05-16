// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./site.config";

import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import sectionize from "remark-sectionize";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  base: "/",

  devToolbar: {
    enabled: false
  },

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ["@resvg/resvg-js"]
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },

  markdown: {
    remarkRehype: {
      footnoteLabel: "Notes",
      footnoteBackContent: "↑",
      footnoteBackLabel: "Retour au contenu"
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: " ↗" },
          target: "_blank"
        }
      ]
    ],
    remarkPlugins: [sectionize]
  }
});
