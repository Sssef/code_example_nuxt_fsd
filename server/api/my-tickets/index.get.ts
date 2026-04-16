import { getMyTicketsPage } from "#server/services/my-tickets/getMyTicketsPage";
import { requireAuth } from "#server/utils/auth/authGuard";

/**
 * BFF endpoint для получения билетов пользователя
 * @returns Билеты пользователя с детальной информацией о сеансах
 */
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  return getMyTicketsPage(event, session);
});
