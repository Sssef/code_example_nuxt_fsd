export const useApiBaseUrl = (): string => {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl;
};
