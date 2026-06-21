import type { Anime, AnimeRes } from "../../types/AnimeType";
import { ANIME_TOTAL_ITEMS, JIKAN_API_PAGE_SIZE } from "./pagination";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";
const CACHE_DIR = join(process.cwd(), "src/data/anime");
const CACHE_FILE = join(CACHE_DIR, "top-anime-cache.json");

const animeListCache = new Map<number, Promise<Anime[]>>();
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 30;

async function fetchWithRetry(
  url: string,
  retries = 3,
  backoff = 2000,
): Promise<AnimeRes> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if ((response.status === 429 || response.status >= 500) && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchWithRetry(url, retries - 1, backoff * 2);
      }
      throw new Error(`Falha na API: ${response.status}`);
    }

    return (await response.json()) as AnimeRes;
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, retries - 1, backoff * 2);
    }
    throw error;
  }
}

async function readFromCache(): Promise<Anime[] | null> {
  try {
    const data = await readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data) as Anime[];
  } catch {
    return null;
  }
}

export async function fetchTopAnime(
  totalItems = ANIME_TOTAL_ITEMS,
): Promise<Anime[]> {
  const now = Date.now();
  const cachedResult = animeListCache.get(totalItems);

  if (cachedResult && now - lastFetchTime < CACHE_TTL) {
    return cachedResult;
  }

  const request = (async () => {
    const pagesNeeded = Math.ceil(totalItems / JIKAN_API_PAGE_SIZE);
    const payloads: AnimeRes[] = [];
    let success = true;

    for (let page = 1; page <= pagesNeeded; page += 1) {
      if (page > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const url = `${TOP_ANIME_URL}?page=${page}&limit=${JIKAN_API_PAGE_SIZE}`;

      try {
        const data = await fetchWithRetry(url);
        payloads.push(data);
      } catch {
        success = false;
        break;
      }
    }

    if (success) {
      const allItems = payloads
        .flatMap((payload) => payload.data)
        .slice(0, totalItems);

      lastFetchTime = Date.now();
      return allItems;
    }

    const fallbackData = await readFromCache();
    if (fallbackData) return fallbackData;

    throw new Error("API Indisponível");
  })();

  animeListCache.set(totalItems, request);

  try {
    return await request;
  } catch {
    animeListCache.delete(totalItems);
    return [];
  }
}
