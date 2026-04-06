import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projectCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/projects",
  }),
  schema: ({ image }: { image: any }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      work: z.string().optional(),
      mainImage: image(),
      otherImages: z.array(image()).optional(),
      storyTitle: z.string(),
      storyContent: z.string(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/content/blog" }),
  schema: ({ image }: { image: any }) => z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    heroImage: image().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Alan Ryan da Silva Domingues"),
  }),
});

export const collections = {
  projects: projectCollection,
  blog: blogCollection,
};