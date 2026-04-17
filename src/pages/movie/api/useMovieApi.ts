import type { MoviePageDto } from "#common/model";

import { useApiClient } from "@shared/api";

export const useMovieApi = () => {
  const fetch = useApiClient();

  return {
    getMoviePageData: async (movieId: number) =>
      fetch<MoviePageDto>(`/api/movies/${movieId}`),
  };
};
