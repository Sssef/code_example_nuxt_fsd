import type { CinemaPageDto } from "#common/model";

import { useApiClient } from "@shared/api";

export const useCinemaApi = () => {
  const fetch = useApiClient();

  return {
    getCinemaPageData: async (cinemaId: number) =>
      fetch<CinemaPageDto>(`/api/cinemas/${cinemaId}`),
  };
};
