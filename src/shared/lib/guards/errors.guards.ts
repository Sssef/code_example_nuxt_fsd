// Fetch-ошибка от $fetch (upstream API)
export type FetchErrorLike = {
  statusCode?: number;
  data?: { message?: string };
};

export const isFetchError = (error: unknown): error is FetchErrorLike => {
  return typeof error === "object" && error !== null && "statusCode" in error;
};

// Nuxt-ошибка (createError, H3Error)
export type NuxtErrorLike = {
  statusCode?: number;
  message?: string;
};

export const isNuxtError = (error: unknown): error is NuxtErrorLike => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  );
};

// Любая HTTP-подобная ошибка (общий гард)
export const isHttpError = (
  error: unknown,
): error is { statusCode: number } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  );
};
