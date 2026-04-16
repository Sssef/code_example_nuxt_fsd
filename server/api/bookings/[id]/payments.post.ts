import { payBooking } from "#server/services/bookings/payBooking";
import { requireAuth } from "#server/utils/auth/authGuard";

/**
 * BFF endpoint для оплаты бронирования
 * @param id - ID бронирования
 */
export default defineEventHandler(async (event): Promise<void> => {
  const bookingId = getRouterParam(event, "id");

  if (!bookingId) {
    throw createError({
      statusCode: 400,
      message: "Некорректный bookingId",
    });
  }

  const session = await requireAuth(event);

  await payBooking(event, bookingId, session);
});
