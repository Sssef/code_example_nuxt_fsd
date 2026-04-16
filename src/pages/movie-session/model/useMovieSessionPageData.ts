import { useMovieSessionsApi } from "../api/useMovieSessionApi";

export const useMovieSessionPageData = () => {
  const route = useRoute();
  const sessionId = computed(() => Number(route.params.id));

  const { getMovieSessionById } = useMovieSessionsApi();

  const {
    data: pageData,
    pending,
    error,
  } = useAsyncData(
    () => `movie-session-${sessionId.value}`,
    () => getMovieSessionById(sessionId.value),
    { watch: [sessionId], default: () => null, server: true },
  );

  return { pageData, pending, error, route, sessionId };
};
