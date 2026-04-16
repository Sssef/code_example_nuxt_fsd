import type { LoginRequest, RegistrationRequest } from "#common/model";

import { useApiClient } from "@shared/api";

export const useAuthApi = () => {
  const fetch = useApiClient();

  return {
    login: async (credentials: LoginRequest) =>
      fetch("/api/auth/login", {
        method: "POST",
        body: credentials,
      }),

    register: async (credentials: RegistrationRequest) =>
      fetch("/api/auth/register", {
        method: "POST",
        body: credentials,
      }),

    logout: async () =>
      fetch("/api/auth/logout", {
        method: "POST",
      }),
  };
};
