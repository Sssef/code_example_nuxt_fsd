import type { Movie } from "#common/model";

import { useApiClient } from "@shared/api";

export const useMoviesApi = () => {
  const fetch = useApiClient();

  return {
    getMovies: async () =>
      fetch<Movie[]>("/api/movies", {
        method: "get",
      }),
  };
};
