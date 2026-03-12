import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projectCollection = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/projects",
  }),
  schema: ({ image }: { image: any }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      work: z.string(),
      mainImage: image(),
      otherImages: z.array(image()).optional(),
      storyTitle: z.string(),
      storyContent: z.string(),
    }),
});

export const collections = {
  projects: projectCollection,
};
