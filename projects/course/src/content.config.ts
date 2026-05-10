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
          .replace(/\.(md|mdx)$/, ""),
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string().max(32),
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
