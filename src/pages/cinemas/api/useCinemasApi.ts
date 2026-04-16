import type { Cinema } from "#common/model";

import { useApiClient } from "@shared/api";

export const useCinemasApi = () => {
  const fetch = useApiClient();

  return {
    getCinemas: async () => fetch<Cinema[]>("/api/cinemas"),
  };
};
