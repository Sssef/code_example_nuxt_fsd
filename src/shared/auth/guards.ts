import { useAuthState } from "./useAuthState";

export const requireAuth = async () => {
  const auth = useAuthState();

  await auth.ensureSessionChecked();

  return auth.isAuthenticated.value;
};

export const requireGuest = async () => {
  const auth = useAuthState();

  await auth.ensureSessionChecked();

  return !auth.isAuthenticated.value;
};
