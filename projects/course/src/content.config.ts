import { file, glob } from "astro/loaders";
import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { parse as parseToml } from "toml";
import { parse as parseCsv } from "csv-parse/sync";

export const collections = {
  todos: defineCollection({
    loader: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      return data.map((todo: any) => ({
        ...todo,
        id: todo.id.toString(),
      }));
    },
    schema: z.object({
      title: z.string(),
      completed: z.boolean(),
    }),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: "src/content/post/**/*.{md,mdx}",
      generateId: ({ entry }) =>
        entry
          .replace(/^\/?src\/content\/post\//, "")
          .replace(/\.(md|mdx)$/, "")
          .replace(/\/index$/, ""),
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string().max(64),
        tags: z.array(z.string()),
        pubDate: z.coerce.date(),
        isDraft: z.boolean(),
        canonicalURL: z.url().optional(),
        cover: image(),
        coverAlt: z.string().optional(),
        author: reference("team").optional(),
      }),
  }),
  team: defineCollection({
    loader: file("src/data/team.json", {
      parser: (text) => JSON.parse(text)["team-1"],
    }),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      email: z.email(),
      avatar: z.url(),
      todos: z.array(reference("todos")),
      department: z.enum([
        "Engenharia",
        "Desenvolvimento de Software",
        "Design de Produto",
      ]),
    }),
  }),
  anime: defineCollection({
    // loader: file("src/data/anime/anime-catalog.json", {
    //   parser: (text) => JSON.parse(text),
    // }),
    loader: glob({
      pattern: "src/content/animes/*.yaml",
      generateId: ({ entry }) =>
        entry.replace(/^\/?src\/content\/animes\//, "").replace(/\.ya?ml$/, ""),
    }),
    schema: z.object({
      id: z.string(),
      anime_id: z.number(),
      title: z.string(),
      episodes: z.number(),
      rating: z.number(),
      is_finished: z.boolean(),
      genres: z.array(z.string()),
      details: z.object({
        studio: z.string(),
        main_character: z.string(),
        release_year: z.number(),
        popular_arcs: z.array(z.string()),
      }),
    }),
  }),
  products: defineCollection({
    loader: file("src/data/product/product-catalog.json", {
      parser: (text) => JSON.parse(text),
    }),
    // loader: glob({
    //   pattern: "src/content/products/*.yaml",
    //   generateId: ({ entry }) =>
    //     entry
    //       .replace(/^\/?src\/content\/products\//, "")
    //       .replace(/\.ya?ml$/, ""),
    // }),
    schema: z.object({
      product_id: z.number(),
      product_name: z.string(),
      price: z.number(),
      in_stock: z.boolean(),
      colors: z.array(z.string()),
      details: z.object({
        brand: z.string(),
        model: z.string(),
        features: z.array(z.string()),
      }),
    }),
  }),
  cats: defineCollection({
    loader: file("src/data/cats.csv", {
      parser: (text) => parseCsv(text, { columns: true, skipEmptyLines: true }),
    }),
  }),
  toml: defineCollection({
    loader: file("src/data/sample.toml", {
      parser: (text) => parseToml(text).servers,
    }),
  }),
};
