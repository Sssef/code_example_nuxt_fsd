import type { Cinema, MovieSession } from "#common/model";

import { groupSessionsByCinema } from "../lib/groupSessionsByCinema";

export function useGroupMovieSessions(
  sessions: Ref<MovieSession[]>,
  cinemas: Ref<Cinema[]>,
) {
  return computed(() => groupSessionsByCinema(sessions.value, cinemas.value));
}
