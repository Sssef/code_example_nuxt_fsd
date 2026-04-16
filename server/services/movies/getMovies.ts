import type { Movie } from "#common/model";

import { fetchAllMovies } from "#server/gateways/movies.api";
import { getOrSetCache } from "#server/utils/cache";

const MOVIES_CACHE_KEY = "movies:all";
const MOVIES_TTL = 300; // секунд

/**
 * Получаем список фильмов из кэша или с API.
 * Этот кэш используется и в публичном списке, и как lookup-таблица для страниц/агрегаций.
 * @returns Список фильмов
 */
export async function getAllMovies(): Promise<Movie[]> {
  const movies = await getOrSetCache<unknown>(
    MOVIES_CACHE_KEY,
    MOVIES_TTL,
    fetchAllMovies,
  );

  if (!Array.isArray(movies)) {
    throw createError({
      statusCode: 502,
      message:
        "Некорректный ответ upstream API: ожидался массив фильмов. Проверьте API_BASE_URL.",
    });
  }

  return movies as Movie[];
}
