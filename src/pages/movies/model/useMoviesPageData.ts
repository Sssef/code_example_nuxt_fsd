import { useApiBaseUrl } from "#common/config";
import type { Movie } from "#common/model";

import { useMoviesApi } from "../api/useMoviesApi";

export const useMoviesPageData = () => {
  const { getMovies } = useMoviesApi();
  const apiBaseUrl = useApiBaseUrl();

  const {
    data: movies,
    error,
    pending,
  } = useAsyncData<Movie[]>("movies-list", () => getMovies(), {
    default: () => [],
    server: true,
    lazy: false,
  });

  const isEmpty = computed(() => {
    if (pending.value || error.value) return false;
    return movies.value?.length === 0;
  });

  const firstMoviePoster = computed(() => {
    if (!movies.value?.length) return null;
    const firstMovie = movies.value[0];

    if (!firstMovie?.posterImage) return null;

    return `${apiBaseUrl}${firstMovie.posterImage}`;
  });

  return {
    movies,
    error,
    pending,
    isEmpty,
    firstMoviePoster,
  };
};
