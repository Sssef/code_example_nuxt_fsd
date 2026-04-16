import { isFetchError, isNuxtError } from "@shared/lib/guards/errorGuards";

/**
 * Извлекает сообщение об ошибке из различных типов ошибок
 * @param error - Объект ошибки
 * @param fallbackMessage - Сообщение по умолчанию, если извлечь текст ошибки не удалось
 * @returns Сообщение об ошибке для отображения пользователю
 */
export const getErrorMessage = (
  error: unknown,
  fallbackMessage = "Неизвестная ошибка",
): string => {
  const getMessageFromData = (data: unknown): string | null => {
    if (typeof data === "string" && data.trim().length > 0) return data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
    ) {
      const message = (data as { message: string }).message.trim();
      return message.length > 0 ? message : null;
    }

    return null;
  };

  // Ошибки $fetch/Nuxt fetch с телом { message }
  if (isFetchError(error)) {
    const message = getMessageFromData(error.data);
    if (message) return message;
  }

  // Nuxt ошибки с сообщением
  if (isNuxtError(error)) {
    const message = error.message?.trim();
    return message && message.length > 0 ? message : fallbackMessage;
  }

  // Error объекты (включая fetch ошибки)
  if (error instanceof Error) {
    return error.message;
  }

  // Строковые ошибки
  if (typeof error === "string") {
    return error;
  }

  // Объекты с message полем
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as Record<string, unknown>).message;
    return typeof msg === "string" && msg.length > 0 ? msg : fallbackMessage;
  }

  return fallbackMessage;
};
