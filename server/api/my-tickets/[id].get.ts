import { getBookingById } from "#server/services/my-tickets/getBookingById";
import { requireAuth } from "#server/utils/auth/authGuard";

export default defineEventHandler(async (event) => {
  const bookingId = getRouterParam(event, "id");
  if (!bookingId) {
    throw createError({ statusCode: 400, message: "Некорректный bookingId" });
  }

  const session = await requireAuth(event);
  return getBookingById(event, bookingId, session);
});
