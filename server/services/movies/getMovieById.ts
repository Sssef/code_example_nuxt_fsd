import type { Movie } from "#common/model";

import { getAllMovies } from "#server/services/movies/getMovies";

/**
 * Поскольку основной API отдает только список фильмов, реализуем поиск по id
 * Получаем фильм по movieId
 * Если фильм не найден - бросаем ошибку 404
 * @param movieId - ID фильма
 * @returns Фильм
 */
export async function getMovieById(movieId: number): Promise<Movie> {
  const movies = await getAllMovies();

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    throw createError({
      statusCode: 404,
      message: `Фильм с id:${movieId} не найден`,
    });
  }

  return movie;
}
