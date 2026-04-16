import type { Cinema } from "#common/model";

import { fetchAllCinemas } from "#server/gateways/cinemas.api";
import { getOrSetCache } from "#server/utils/cache";

const CINEMAS_CACHE_KEY = "cinemas:all";
const CINEMAS_TTL = 300; // секунд

/**
 * Получаем список кинотеатров из кэша или с API.
 * Этот кэш используется и в публичном списке, и как lookup-таблица для страниц/агрегаций.
 * @returns Массив кинотеатров
 */
export async function getAllCinemas(): Promise<Cinema[]> {
  return getOrSetCache<Cinema[]>(
    CINEMAS_CACHE_KEY,
    CINEMAS_TTL,
    fetchAllCinemas,
  );
}
