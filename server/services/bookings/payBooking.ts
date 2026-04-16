import { createBookingPayment } from "#server/gateways/booking.api";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

export async function payBooking(
  event: H3Event,
  bookingId: string,
  session: UserSession,
) {
  return createBookingPayment(event, bookingId, session);
}
