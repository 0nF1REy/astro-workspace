import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const products = await getCollection("products", ({ data }) => data.in_stock);

  return Response.json(products.map((item) => item.data));
};
