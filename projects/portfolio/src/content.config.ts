import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projectCollection = defineCollection({
  loader: glob({
    pattern: "**/index.json",
    base: "./src/content/projects",
  }),
  schema: ({ image }: { image: any }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      work: z.string().optional(),
      mainImage: image(),
      mainImageRemote: z.string().url().optional(),
      otherImages: z.array(image()).optional(),
      storyTitle: z.string(),
      storyContent: z.string(),
      tags: z.array(z.string()).optional(),
      videoUrl: z.string().url().optional(),
      videoFallback: z.string().optional(),
    }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: ({ image }: { image: any }) =>
    z.object({
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
