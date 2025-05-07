import { getCollection } from "astro:content";

export default async function getAllPosts() {
  // Import the collections
  const articles = await getCollection("articles");
  const notes = await getCollection("notes");
  const translations = await getCollection("translations");

  return [...articles, ...notes, ...translations].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}
