import type { MovieSessionDto } from "#common/model";

import { useApiClient } from "@shared/api";

export const useMovieSessionsApi = () => {
  const fetch = useApiClient();

  return {
    getMovieSessionById: async (sessionId: number) =>
      fetch<MovieSessionDto>(`/api/movie-sessions/${sessionId}`),
  };
};
