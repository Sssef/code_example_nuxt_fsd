import { createError } from "h3";

import { normalizeFetchError } from "#server/utils/errorNormalizer";

/** Контекст для обработки ошибок BFF */
export type BffErrorContext = {
  //Сообщение по умолчанию, если upstream не вернул сообщение
  fallbackMessage: string;
  // Функция для маппинга статуса upstream в сообщение для клиента
  mapMessage?: (upstreamStatus: number) => string;
  // Функция для маппинга статуса upstream в статус для клиента
  mapStatus?: (upstreamStatus: number) => number;
  // Логировать ли ошибку в консоль (по умолчанию true)
  log?: boolean;
};

/**
 * Маппит ошибки от upstream API в ошибку BFF
 * @param error - Ошибка от upstream API или сетевая ошибка
 * @param context - Контекст для обработки ошибки (сообщения, маппинг статусов, логирование)
 * @throws Всегда бросает ошибку через createError с маппнутым статусом и сообщением
 */
export function mapFetchError(error: unknown, context: BffErrorContext): never {
  const { upstreamStatus, upstreamMessage, isNetworkError } =
    normalizeFetchError(error);

  if (context.log !== false) {
    console.error("[BFF ERROR]", {
      upstreamStatus,
      upstreamMessage,
      isNetworkError,
      rawError: error,
    });
  }

  const statusCode = context.mapStatus
    ? context.mapStatus(upstreamStatus)
    : defaultStatusMapper(upstreamStatus, isNetworkError);

  const message =
    context.mapMessage?.(upstreamStatus) ??
    upstreamMessage ??
    context.fallbackMessage;

  throw createError({
    statusCode,
    message,
    data: {
      upstreamStatus,
    },
  });
}

/**
 * Маппит статус upstream API в статус для клиента по умолчанию
 * @param upstreamStatus - Статус от upstream API
 * @param isNetworkError - Флаг сетевой ошибки
 * @returns Статус для клиента
 */
function defaultStatusMapper(
  upstreamStatus: number,
  isNetworkError: boolean,
): number {
  if (isNetworkError) return 503;

  switch (upstreamStatus) {
    case 400:
    case 401:
    case 403:
    case 404:
      return upstreamStatus;
    default:
      return 502;
  }
}
