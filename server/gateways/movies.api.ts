import type { Movie, Session } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

/**
 * Получает список фильмов из кэша или с API
 * @returns Список фильмов
 */
export async function fetchAllMovies() {
  return upstreamFetch<Movie[]>("/movies");
}

/**
 * Получает список сессий фильма
 * @param movieId
 * @returns Список киносессий фильма
 */
export async function fetchMovieSessions(movieId: number) {
  return upstreamFetch<Session[]>(`/movies/${movieId}/sessions`);
}
