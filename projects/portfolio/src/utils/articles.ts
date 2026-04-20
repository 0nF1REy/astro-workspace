import type { CollectionEntry } from "astro:content";

export function shouldShowArticlesButton(articles: CollectionEntry<"blog">[]): boolean {
  return articles.length >= 4;
}

export function getArticlesGrid(articles: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] {
  return articles.slice(0, 3);
}
