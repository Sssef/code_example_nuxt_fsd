import type {
  MovieSession,
  Movie,
  MovieSessionDate,
  SessionInfo,
} from "#common/model";

import {
  formatShortDate,
  formatShortTime,
} from "@shared/lib/formatters/formatter";

export function groupSessionsByMovie(
  sessions: MovieSession[],
  movies: Movie[],
): Map<MovieSessionDate, Map<Movie | undefined, SessionInfo[]>> {
  const movieMapById = new Map<number, Movie>(movies.map((m) => [m.id, m]));

  const result = new Map<
    MovieSessionDate,
    Map<Movie | undefined, SessionInfo[]>
  >();

  for (const session of sessions) {
    const day = formatShortDate(session.startTime);
    const time = formatShortTime(session.startTime);

    const movie = movieMapById.get(session.movieId);

    let dayMap = result.get(day);
    if (!dayMap) {
      dayMap = new Map<Movie | undefined, SessionInfo[]>();
      result.set(day, dayMap);
    }

    let list = dayMap.get(movie);
    if (!list) {
      list = [];
      dayMap.set(movie, list);
    }

    list.push({
      id: session.id,
      time,
    });
  }

  return result;
}
