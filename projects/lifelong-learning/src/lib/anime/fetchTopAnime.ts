import type { Anime, AnimeRes } from "../../types/AnimeType";
import { ANIME_TOTAL_ITEMS, JIKAN_API_PAGE_SIZE } from "./pagination";

const TOP_ANIME_URL = "https://api.jikan.moe/v4/top/anime";
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
          `[API] Erro ${response.status}. Tentando novamente em ${backoff}ms... (${retries} tentativas restantes)`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchWithRetry(url, retries - 1, backoff * 2);
      }
      throw new Error(`Falha na API: ${response.status}`);
    }

    return (await response.json()) as AnimeRes;
  } catch (error) {
    if (retries > 0) {
      console.error(
        `[API] Erro de conexão. Tentando novamente em ${backoff}ms...`,
        error,
      );
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, retries - 1, backoff * 2);
    }
    throw error;
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

    for (let page = 1; page <= pagesNeeded; page += 1) {
      if (page > 1) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const url = `${TOP_ANIME_URL}?page=${page}&limit=${JIKAN_API_PAGE_SIZE}`;

      try {
        const data = await fetchWithRetry(url);
        payloads.push(data);
      } catch {
        console.error(
          `[Build] Não foi possível carregar a página ${page} após várias tentativas.`,
        );
        break;
      }
    }

    const allItems = payloads
      .flatMap((payload) => payload.data)
      .slice(0, totalItems);

    return allItems;
  })();

  animeListCache.set(totalItems, request);

  try {
    return await request;
  } catch {
    animeListCache.delete(totalItems);
    console.error(
      "[Critical] Erro ao buscar animes. Retornando lista vazia para preservar o build.",
    );
    return [];
  }
}
