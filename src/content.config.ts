// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const articles = defineCollection({
  loader: glob({
    base: "./src/content/articles",
    pattern: "**/*.md"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    color: z.string().min(4).max(9).regex(/^#/).optional()
  })
});
const translations = defineCollection({
  loader: glob({
    base: "./src/content/translations",
    pattern: "**/*.md"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    color: z.string().min(4).max(9).regex(/^#/).optional()
  })
});
const notes = defineCollection({
  loader: glob({
    base: "./src/content/notes",
    pattern: "**/*.md"
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    color: z.string().min(4).max(9).regex(/^#/).optional()
  })
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { articles, translations, notes };
