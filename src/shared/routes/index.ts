type Id = string | number;

type QueryValue = string | number | boolean | null | undefined;
type Query = Record<string, QueryValue>;

const withQuery = (path: string, query?: Query): string => {
  if (!query) return path;

  const searchParams = new URLSearchParams();

  for (const key in query) {
    const value = query[key];
    if (value === undefined || value === null) continue;

    searchParams.append(key, String(value));
  }

  const search = searchParams.toString();
  return search ? `${path}?${search}` : path;
};

/**
 * Примеры использования:
 * routes.movies({ id: 1 });
 * routes.movies({ query: { page: 2 } });
 * routes.movieSession({ id: 42 });
 */
export const routes = {
  home: (): string => "/",

  movies: (options?: { id?: Id; query?: Query }): string => {
    const path = options?.id ? `/movies/${options.id}` : "/movies";
    return withQuery(path, options?.query);
  },

  cinemas: (options?: { id?: Id; query?: Query }): string => {
    const path = options?.id ? `/cinemas/${options.id}` : "/cinemas";
    return withQuery(path, options?.query);
  },

  movieSession: (options: { id: Id; query?: Query }): string => {
    return withQuery(`/movie-sessions/${options.id}`, options.query);
  },

  myTickets: (): string => "/my-tickets",

  auth: {
    login: (): string => "/auth/login",
    register: (): string => "/auth/register",
  },
} as const;
