import type { CollectionEntry } from "astro:content";

export function shouldShowProjectsButton(
  projects: CollectionEntry<"projects">[],
): boolean {
  return projects.length >= 4;
}

export function getProjectsGrid(
  projects: CollectionEntry<"projects">[],
): CollectionEntry<"projects">[] {
  return projects.slice(0, 3);
}
