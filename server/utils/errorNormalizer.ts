type FetchErrorLike = {
  statusCode?: number;
  data?: unknown;
  message?: string;
  cause?: unknown;
  response?: unknown;
};

/** Нормализованная ошибка от upstream API */
export type NormalizedError = {
  // HTTP статус от upstream API
  upstreamStatus: number;
  // Сообщение об ошибке от upstream API (если есть)
  upstreamMessage?: string;
  // Флаг сетевой ошибки (когда upstream недоступен)
  isNetworkError: boolean;
};

/**
 * Нормализует ошибку от upstream API или сетевую ошибку в стандартизированный формат
 * @param error - Ошибка от $fetch или другая неизвестная ошибка
 * @returns Нормализованная ошибка с понятными полями
 */
export function normalizeFetchError(error: unknown): NormalizedError {
  const defaultError: NormalizedError = {
    upstreamStatus: 500,
    isNetworkError: true,
  };

  if (typeof error !== "object" || error === null) {
    return defaultError;
  }

  const fetchError = error as FetchErrorLike;
  const data = fetchError.data;

  let upstreamMessage: string | undefined;
  if (typeof data === "object" && data !== null && "message" in data) {
    const msg = (data as Record<string, unknown>).message;
    if (typeof msg === "string") upstreamMessage = msg;
  }

  const hasHttpResponse =
    "response" in fetchError && fetchError.response != null;
  const hasStatusCode = typeof fetchError.statusCode === "number";
  const messageIndicatesNetworkIssue =
    typeof fetchError.message === "string" &&
    /fetch failed|network|econnrefused|enotfound|timed out/i.test(
      fetchError.message,
    );
  const causeIndicatesNetworkIssue =
    typeof fetchError.cause === "object" && fetchError.cause !== null;
  const isNetworkError =
    (!hasHttpResponse && !hasStatusCode) ||
    messageIndicatesNetworkIssue ||
    causeIndicatesNetworkIssue;

  return {
    upstreamStatus: hasStatusCode ? (fetchError.statusCode as number) : 500,
    upstreamMessage,
    isNetworkError,
  };
}
