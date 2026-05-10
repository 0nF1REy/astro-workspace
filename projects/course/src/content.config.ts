import { file, glob } from "astro/loaders";
import { defineCollection } from "astro:content";
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
  }),
  posts: defineCollection({
    loader: glob({
      pattern: "src/data/posts/**/*.{md,mdx}",
    }),
  }),
  team: defineCollection({
    loader: file("src/data/team.json", {
      parser: (text) => JSON.parse(text),
    }),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      email: z.string().email(),
      avatar: z.string().url(),
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
