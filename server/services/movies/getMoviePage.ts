import { fetchMovieSessions } from "#server/gateways/movies.api";
import { getAllCinemas } from "#server/services/cinemas/getCinemas";
import { getMovieById } from "#server/services/movies/getMovieById";

export async function getMoviePage(movieId: number) {
  const movie = await getMovieById(movieId);

  const [sessions, cinemas] = await Promise.all([
    fetchMovieSessions(movieId),
    getAllCinemas(),
  ]);

  return {
    movie,
    sessions,
    cinemas,
  };
}
