import { fetchCinemaSessions } from "#server/gateways/cinemas.api";
import { getCinemaById } from "#server/services/cinemas/getCinemaById";
import { getAllMovies } from "#server/services/movies/getMovies";

/**
 * Получаем страницу кинотеатра с сессиями и фильмами
 * @param cinemaId - ID кинотеатра
 * @returns Объект с кинотеатром, сессиями и фильмами
 */
export async function getCinemaPage(cinemaId: number) {
  const cinema = await getCinemaById(cinemaId);

  const [sessions, movies] = await Promise.all([
    fetchCinemaSessions(cinemaId),
    getAllMovies(),
  ]);

  return {
    cinema,
    sessions,
    movies,
  };
}
