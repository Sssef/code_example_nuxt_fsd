import type { Movie, MovieSession } from "#common/model";

import { groupSessionsByMovie } from "../lib/groupSessionsByMovie";

export function useGroupCinemaSessions(
  sessions: Ref<MovieSession[]>,
  movies: Ref<Movie[]>,
) {
  return computed(() => groupSessionsByMovie(sessions.value, movies.value));
}
