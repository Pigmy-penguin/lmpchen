import { getCollection } from "astro:content";

export default async function getAllPosts() {
  // Import the collections except for the "notes" collection
  const articles = await getCollection("articles");
  // const notes = await getCollection("notes");
  const translations = await getCollection("translations");

  return [...articles, ...translations].sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf()
  );
}
