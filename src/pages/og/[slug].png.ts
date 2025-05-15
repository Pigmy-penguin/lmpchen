import type { APIRoute } from "astro";
import { type CollectionEntry } from "astro:content";
import { getPostImageBuffer } from "../../og";
import getAllPosts from "../../utils/getAllPosts";

export async function getStaticPaths() {
  const posts = await getAllPosts(true);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { ...post }
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await getPostImageBuffer(props as CollectionEntry<"notes">), {
    headers: { "Content-Type": "image/png" }
  });
