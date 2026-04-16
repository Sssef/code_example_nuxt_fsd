import { getAllCinemas } from "#server/services/cinemas/getCinemas";

/**
 * BFF endpoint для получения списка кинотеатров
 * @returns Список кинотеатров
 */
export default defineEventHandler(async () => {
  return getAllCinemas();
});
