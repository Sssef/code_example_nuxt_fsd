import { useCinemaApi } from "../api/useCinemaApi";

export const useCinemaPageData = () => {
  const route = useRoute();
  const cinemaId = Number(route.params.id);

  const { getCinemaPageData } = useCinemaApi();

  const { data, pending, error } = useAsyncData(
    `cinema-page-${cinemaId}`,
    () => getCinemaPageData(cinemaId),
    { default: () => null, server: true },
  );

  const isLoading = computed(() => pending.value || data.value === null);
  const isEmpty = computed(() => {
    if (isLoading.value || error.value) return false;
    return data.value === null;
  });

  return {
    isEmpty,
    error,
    isLoading,
    cinema: computed(() => data.value?.cinema),
    movies: computed(() => data.value?.movies),
    sessions: computed(() => data.value?.sessions),
    cinemaId,
    route,
  };
};
