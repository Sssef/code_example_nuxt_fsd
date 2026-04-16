import { useApiClient } from "@shared/api";

export const useAuthState = () => {
  const isAuthenticated = useState<boolean>(
    "auth:isAuthenticated",
    () => false,
  );
  const hasCheckedSession = useState<boolean>(
    "auth:hasCheckedSession",
    () => false,
  );

  const setAuthenticated = (value: boolean): void => {
    isAuthenticated.value = value;
    hasCheckedSession.value = true;
  };

  const ensureSessionChecked = async (): Promise<void> => {
    if (hasCheckedSession.value) return;

    const nuxtApp = useNuxtApp();
    const promiseKey = "_authSessionCheckPromise";
    const existing = (nuxtApp as Record<string, unknown>)[promiseKey];

    if (existing && typeof (existing as Promise<void>).then === "function") {
      await (existing as Promise<void>);
      return;
    }

    const promise = (async () => {
      try {
        if (import.meta.server) {
          const requestFetch = useApiClient();
          const result = await requestFetch<{ isAuthenticated: boolean }>(
            "/api/auth/session",
            { method: "GET" },
          );
          isAuthenticated.value = Boolean(result.isAuthenticated);
          return;
        }

        const result = await $fetch<{ isAuthenticated: boolean }>(
          "/api/auth/session",
          { credentials: "include" },
        );
        isAuthenticated.value = Boolean(result.isAuthenticated);
      } catch {
        isAuthenticated.value = false;
      } finally {
        hasCheckedSession.value = true;

        const store = nuxtApp as Record<string, unknown>;
        delete store[promiseKey];
      }
    })();

    (nuxtApp as Record<string, unknown>)[promiseKey] = promise;
    await promise;
  };

  return {
    isAuthenticated,
    hasCheckedSession,
    ensureSessionChecked,
    setAuthenticated,
  };
};
