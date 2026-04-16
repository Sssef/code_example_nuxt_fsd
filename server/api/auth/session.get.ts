import { defineEventHandler } from "h3";

import { getSessionStatus } from "#server/services/auth/getSessionStatus";

/**
 * Проверяет статус аутентификации пользователя
 * @param event - H3 event объект
 * @returns Promise<{ isAuthenticated: boolean }> - Статус аутентификации
 */
export default defineEventHandler(
  async (event): Promise<{ isAuthenticated: boolean }> => {
    return getSessionStatus(event);
  },
);
