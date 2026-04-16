import type { MoviePageDto } from "#common/model";

import { useApiClient } from "@shared/api";

export const useMovieApi = () => {
  const fetch = useApiClient();

  return {
    /** Получает детальную информацию о фильме с сеансами и кинотеатрами */
    getMoviePageData: async (movieId: number) =>
      fetch<MoviePageDto>(`/api/movies/${movieId}`),
  };
};
