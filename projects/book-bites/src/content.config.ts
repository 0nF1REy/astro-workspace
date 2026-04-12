import { file } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const books = defineCollection({
  loader: file("src/content/books.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    rating: z.number(),
    summary: z.string(),
  }),
});

export const collections = { books };
