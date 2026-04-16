import { getMovieSessionDetails } from "#server/services/movie-sessions/getMovieSessionDetails";

/**
 * BFF endpoint для получения детальной информации о сеансе фильма
 * @returns Детальную информацию сессии с фильмоми и кинотеатром
 */
export default defineEventHandler(async (event) => {
  const movieSessionId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(movieSessionId) || movieSessionId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Некорректный movieSessionId",
    });
  }

  return getMovieSessionDetails(movieSessionId);
});
