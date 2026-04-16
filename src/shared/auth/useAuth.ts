import type { LoginRequest, RegistrationRequest } from "#common/model";

import { useAuthApi } from "./useAuthApi";
import { useAuthState } from "./useAuthState";

export const useAuth = () => {
  const api = useAuthApi();
  const authState = useAuthState();
  const isAuthenticated = computed(() => authState.isAuthenticated.value);

  const login = async (data: LoginRequest) => {
    await api.login(data);
    authState.setAuthenticated(true);
  };

  const register = async (data: RegistrationRequest) => {
    await api.register(data);
    authState.setAuthenticated(true);
  };

  const logout = async () => {
    await api.logout();

    authState.setAuthenticated(false);
  };

  return {
    login,
    register,
    logout,
    isAuthenticated,
  };
};
