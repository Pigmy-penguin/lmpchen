import type { APIRoute } from "astro";
import { type CollectionEntry } from "astro:content";
import { getPostImageBuffer } from "../../../og";
import getAllPosts from "../../../utils/getAllPosts";
import oklchToHex from "../../../utils/colorConverter";

export async function getStaticPaths() {
  const posts = await getAllPosts(true);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      ...post,
      data: {
        ...post.data,
        twitter: true,
        formattedColor: post.data.color
          ? post.data.color.startsWith("oklch")
            ? oklchToHex(post.data.color)
            : post.data.color
          : "#000000"
      }
    }
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(
    await getPostImageBuffer(
      props as CollectionEntry<"articles" | "notes" | "translations">
    ),
    {
      headers: { "Content-Type": "image/png" }
    }
  );
