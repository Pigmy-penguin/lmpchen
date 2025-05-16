import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import getAllPosts from "../utils/getAllPosts";
import { siteConfig } from "../../site.config";

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,

    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site!,

    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: allPosts.map((post) => ({
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
