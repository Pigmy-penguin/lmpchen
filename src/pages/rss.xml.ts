import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const articles = await getCollection("articles");
  const notes = await getCollection("notes");
  const translations = await getCollection("translations");

  const allPosts = [...articles, ...notes, ...translations].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
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
