import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const animes = await getCollection("animes", ({ data }) => data.is_finished);

  return Response.json(animes.map((item) => item.data));
};
