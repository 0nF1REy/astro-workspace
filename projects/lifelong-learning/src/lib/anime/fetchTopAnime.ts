import type { Anime, AnimeRes } from "../../types/AnimeType";
import { ANIME_TOTAL_ITEMS, JIKAN_API_PAGE_SIZE } from "./pagination";

const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";
const animeListCache = new Map<number, Promise<Anime[]>>();

export async function fetchTopAnime(
  totalItems = ANIME_TOTAL_ITEMS,
): Promise<Anime[]> {
  const cachedResult = animeListCache.get(totalItems);

  if (cachedResult) {
    return cachedResult;
  }

  const request = (async () => {
    const pagesNeeded = Math.ceil(totalItems / JIKAN_API_PAGE_SIZE);
    const payloads: AnimeRes[] = [];

    for (let page = 1; page <= pagesNeeded; page += 1) {
      if (page > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const response = await fetch(
        `${TOP_ANIME_URL}?page=${page}&limit=${JIKAN_API_PAGE_SIZE}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch anime list: ${response.status}`);
      }

      const data = (await response.json()) as AnimeRes;
      payloads.push(data);
    }

    const allItems = payloads
      .flatMap((payload) => payload.data)
      .slice(0, totalItems);
    return allItems;
  })();

  animeListCache.set(totalItems, request);

  try {
    return await request;
  } catch (error) {
    animeListCache.delete(totalItems);
    throw error;
  }
}
