import fs from "node:fs";

import { defineSatoriConfig } from "x-satori/astro";
import { siteConfig } from "../../site.config";

export default defineSatoriConfig({
  height: 659,
  width: 1260,
  props: {
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteConfig.title,
    imageUrl: undefined
  },
  fonts: [
    {
      name: "spectral",
      data: fs.readFileSync(
        "node_modules/@fontsource/spectral/files/spectral-latin-400-normal.woff"
      ),
      weight: 400,
      style: "normal"
    },
    {
      name: "spectral",
      data: fs.readFileSync(
        "node_modules/@fontsource/spectral/files/spectral-latin-600-normal.woff"
      ),
      weight: 600,
      style: "normal"
    },
    {
      name: "Freckle Face",
      data: fs.readFileSync(
        "node_modules/@fontsource/freckle-face/files/freckle-face-latin-400-normal.woff"
      ),
      weight: 400,
      style: "normal"
    }
  ]
});
