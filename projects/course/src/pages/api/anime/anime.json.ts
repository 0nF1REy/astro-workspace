import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const anime = await getCollection("anime", ({ data }) => data.is_finished);

  return Response.json(anime.map((item) => item.data));
};
