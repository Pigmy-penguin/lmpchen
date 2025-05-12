import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../../site.config";

export async function GET(context: APIContext) {
  const notes = await getCollection("notes");

  return rss({
    title: siteConfig.title + ", notes",
    description: siteConfig.description,

    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site!,

    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: notes.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      categories: [post.collection],
      pubDate: post.data.published,
      link: `/articles/${post.id}`
    })),

    // (optional) inject custom xml
    customData: `<language>fr-fr</language>`
  });
}
