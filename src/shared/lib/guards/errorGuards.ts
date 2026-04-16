const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export type HttpErrorLike = {
  statusCode?: number;
  status?: number;
  data?: unknown;
  message?: string;
};

export const isHttpError = (error: unknown): error is HttpErrorLike => {
  if (!isRecord(error)) return false;

  return (
    typeof error.statusCode === "number" || typeof error.status === "number"
  );
};

export const isFetchError = (
  error: unknown,
): error is HttpErrorLike & { data?: unknown } => {
  return isHttpError(error) && "data" in error;
};

export const isNuxtError = (
  error: unknown,
): error is HttpErrorLike & { message: string } => {
  return isHttpError(error) && typeof error.message === "string";
};

export const getHttpStatusCode = (error: unknown): number | null => {
  if (!isHttpError(error)) return null;

  if (typeof error.statusCode === "number") return error.statusCode;
  if (typeof error.status === "number") return error.status;

  return null;
};
