import type { Booking } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

/**
 * Получает список бронирований пользователя
 * @param event - H3 event объект (для сброса сессии при 401)
 * @returns Booking[]
 */
export async function fetchUserBookings(
  event: H3Event,
  session: UserSession,
): Promise<Booking[]> {
  return upstreamFetch<Booking[]>(event, "/me/bookings", {
    headers: {
      Authorization: `Bearer ${session.authToken}`,
    },
  });
}

/**
 * Отправляет запрос на оплату брони
 * @param bookingId
 * @param autHeaders
 * @returns
 */
export async function createBookingPayment(
  event: H3Event,
  bookingId: string,
  session: UserSession,
) {
  return upstreamFetch(event, `/bookings/${bookingId}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.authToken}`,
    },
  });
}
