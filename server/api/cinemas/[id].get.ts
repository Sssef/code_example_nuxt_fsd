import { getCinemaPage } from "#server/services/cinemas/getCinemaPage";

/**
 * BFF endpoint для получения кинотеатра по ID
 * @param id - ID кинотеатра
 * @returns Данные кинотеатра с сессиями и фильмами
 */
export default defineEventHandler(async (event) => {
  const cinemaId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(cinemaId) || cinemaId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Некорректный cinemaId",
    });
  }

  return getCinemaPage(cinemaId);
});
