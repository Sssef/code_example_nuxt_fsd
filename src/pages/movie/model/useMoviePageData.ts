import { useMovieApi } from "../api/useMovieApi";

export const useMoviePageData = () => {
  const route = useRoute();
  const movieId = Number(route.params.id);

  const { getMoviePageData } = useMovieApi();

  const { data, pending, error } = useAsyncData(
    `movie-page-${movieId}`,
    () => getMoviePageData(movieId),
    {
      default: () => null,
      server: true,
    },
  );

  const isLoading = computed(() => pending.value);
  const isEmpty = computed(() => {
    if (pending.value || error.value) return false;
    return !data.value?.movie || !data.value?.sessions || !data.value?.cinemas;
  });

  return {
    movie: computed(() => data.value?.movie),
    cinemas: computed(() => data.value?.cinemas),
    movieSessions: computed(() => data.value?.sessions),
    isLoading,
    error,
    isEmpty,
    route,
  };
};
