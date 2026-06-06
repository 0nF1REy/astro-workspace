import type {
  Pokemon,
  PokemonListRes,
  PokemonDetailRes,
} from "../../types/PokeType";
import { POKEMON_TOTAL_ITEMS } from "./pagination";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { insertLog } from "@db/logs";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const CACHE_DIR = join(process.cwd(), "src/data/pokemon");
const CACHE_FILE = join(CACHE_DIR, "pokemon-cache.json");

const pokemonCache = new Map<number, Promise<Pokemon[]>>();

async function fetchWithRetry<T>(
  url: string,
  retries = 3,
  backoff = 2000,
): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if ((response.status === 429 || response.status >= 500) && retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchWithRetry(url, retries - 1, backoff * 2);
      }
      throw new Error(`Fail: ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, retries - 1, backoff * 2);
    }
    throw error;
  }
}

async function saveToCache(data: Pokemon[]) {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(error);
  }
}

async function readFromCache(): Promise<Pokemon[] | null> {
  try {
    const data = await readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data) as Pokemon[];
  } catch {
    return null;
  }
}

export async function fetchPokemon(
  limit = POKEMON_TOTAL_ITEMS,
): Promise<Pokemon[]> {
  const cachedResult = pokemonCache.get(limit);

  if (cachedResult) {
    return cachedResult;
  }

  const request = (async () => {
    try {
      const listData = await fetchWithRetry<PokemonListRes>(
        `${API_URL}?limit=${limit}`,
      );
      const pokemonList: Pokemon[] = [];

      for (const item of listData.results) {
        try {
          const detail = await fetchWithRetry<PokemonDetailRes>(item.url);
          pokemonList.push({
            id: detail.id,
            name: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map((t) => t.type.name),
            height: detail.height,
            weight: detail.weight,
          });
        } catch {
          continue;
        }
      }

      if (pokemonList.length > 0) {
        await saveToCache(pokemonList);
        return pokemonList;
      }

      throw new Error("Empty list");
    } catch {
      const fallbackData = await readFromCache();
      if (fallbackData) return fallbackData;

      await insertLog({
        url: API_URL,
        status: 500,
        date_accessed: new Date(),
      });

      return [];
    }
  })();

  pokemonCache.set(limit, request);
  return request;
}
