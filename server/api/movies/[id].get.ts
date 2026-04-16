import { getMoviePage } from "#server/services/movies/getMoviePage";

/**
 * BFF endpoint для получения фильма по ID
 */
export default defineEventHandler(async (event) => {
  const movieId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(movieId) || movieId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Некорректный movieId",
    });
  }

  return getMoviePage(movieId);
});
