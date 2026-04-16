import type { Cinema } from "#common/model";

import { getAllCinemas } from "#server/services/cinemas/getCinemas";

/**
 * Поскольку основной API отдает только список кинотеатров, реализуем поиск по id
 * @param cinemaId - ID кинотеатра
 * @returns Кинотеатр
 */
export async function getCinemaById(cinemaId: number): Promise<Cinema> {
  const cinemas = await getAllCinemas();
  const cinema = cinemas.find((c) => c.id === cinemaId);

  if (!cinema) {
    throw createError({
      statusCode: 404,
      message: `Кинотеатр с id:${cinemaId} не найден`,
    });
  }

  return cinema;
}
