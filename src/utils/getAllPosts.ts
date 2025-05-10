import { getCollection } from "astro:content";

export default async function getAllPosts(withNotes = false) {
  const articles = await getCollection("articles");
  const translations = await getCollection("translations");
  const notes = withNotes ? await getCollection("notes") : [];

  return [...articles, ...translations, ...notes].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}
