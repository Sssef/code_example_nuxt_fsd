import { getAllMovies } from "#server/services/movies/getMovies";

/**
 * BFF endpoint для получения списка фильмов
 * @returns Список фильмов
 */
export default defineEventHandler(async () => {
  return getAllMovies();
});
