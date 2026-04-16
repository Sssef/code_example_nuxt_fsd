import { fetchMovieSessionById } from "#server/gateways/movieSession.api";
import { getCinemaById } from "#server/services/cinemas/getCinemaById";
import { getMovieById } from "#server/services/movies/getMovieById";

export async function getMovieSessionDetails(movieSessionId: number) {
  const movieSession = await fetchMovieSessionById(movieSessionId);

  const [movie, cinema] = await Promise.all([
    getMovieById(movieSession.movieId),
    getCinemaById(movieSession.cinemaId),
  ]);

  return {
    ...movieSession,
    movie,
    cinema,
  };
}
