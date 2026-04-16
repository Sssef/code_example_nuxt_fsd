import { defineEventHandler } from "h3";

import { logout } from "#server/services/auth/logout";

/**
 * Обрабатывает выход пользователя из системы
 * @param event - H3 event объект
 * @returns Promise<{ ok: true }> - Результат логаута
 */
export default defineEventHandler(async (event): Promise<{ ok: true }> => {
  return logout(event);
});
