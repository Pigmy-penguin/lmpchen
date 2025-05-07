import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import getAllPosts from "../utils/getAllPosts";

export async function GET(context: APIContext) {
  const allPosts = await getAllPosts();

  return rss({
    title: "Lämpchen",
    description:
      "Je publie des textes autour du marxisme, de la critique de l'économie politique, de l'épistémologie — et d'autres choses encore, selon les détours que prend la pensée.",

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
