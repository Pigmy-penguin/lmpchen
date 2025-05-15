// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";
import getRandomColor from "./utils/getRandomColor";
import getImageUrl from "./utils/getImageUrl";
import { getImage } from "astro:assets";
import { siteConfig } from "../site.config";

const commonSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageUrl: z.string().optional(),
    color: z
      .string()
      .min(4)
      .max(9)
      .regex(/^#/)
      .optional()
      .transform((color) => {
        if (color) return color;
        return getRandomColor();
      })
  })
  .transform(async (data) => {
    if (data.image) {
      return {
        ...data,
        imageUrl:
          siteConfig.url +
          (
            await getImage({
              src: await getImageUrl(data.image),
              format: "png"
            })
          ).src
      };
    }
    return data;
  });

// 3. Define your collection(s)
const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.md"
  }),
  schema: commonSchema
});
const translations = defineCollection({
  loader: glob({
    base: "./src/content/translations",
    pattern: "**/*.md"
  }),
  schema: commonSchema
});
const notes = defineCollection({
  loader: glob({
    base: "./src/content/notes",
    pattern: "**/*.md"
  }),
  schema: commonSchema
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { articles, translations, notes };
