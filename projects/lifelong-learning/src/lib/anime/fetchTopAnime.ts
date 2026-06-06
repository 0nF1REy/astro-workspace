import type { Anime, AnimeRes } from "../../types/AnimeType";
import { ANIME_TOTAL_ITEMS, JIKAN_API_PAGE_SIZE } from "./pagination";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";
const CACHE_DIR = join(process.cwd(), "src/data/anime");
const CACHE_FILE = join(CACHE_DIR, "top-anime-cache.json");

const animeListCache = new Map<number, Promise<Anime[]>>();

async function fetchWithRetry(
  url: string,
  retries = 3,
  backoff = 2000,
): Promise<AnimeRes> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if ((response.status === 429 || response.status >= 500) && retries > 0) {
        console.warn(
          `[API] Erro ${response.status}. Tentando novamente em ${backoff}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchWithRetry(url, retries - 1, backoff * 2);
      }
      throw new Error(`Falha na API: ${response.status}`);
    }

    return (await response.json()) as AnimeRes;
  } catch (error) {
    if (retries > 0) {
      console.error(`[API] Erro de conexão. Tentando novamente...`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, retries - 1, backoff * 2);
    }
    throw error;
  }
}

async function saveToCache(data: Anime[]) {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
    console.log("[Cache] Dados atualizados com sucesso no snapshot local.");
  } catch {
    console.error("[Cache] Falha ao salvar snapshot local.");
  }
}

async function readFromCache(): Promise<Anime[] | null> {
  try {
    const data = await readFile(CACHE_FILE, "utf-8");
    console.log("[Cache] Usando snapshot local (fallback).");
    return JSON.parse(data) as Anime[];
  } catch {
    return null;
  }
}

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
        console.error(`[Build] Falha crítica na página ${page}.`);
        success = false;
        break;
      }
    }

    if (success) {
      const allItems = payloads
        .flatMap((payload) => payload.data)
        .slice(0, totalItems);

      await saveToCache(allItems);
      return allItems;
    }

    const fallbackData = await readFromCache();
    if (fallbackData) return fallbackData;

    throw new Error("API Indisponível e sem cache local.");
  })();

  animeListCache.set(totalItems, request);

  try {
    return await request;
  } catch {
    animeListCache.delete(totalItems);
    console.error("[Critical] Sem dados disponíveis.");
    return [];
  }
}
