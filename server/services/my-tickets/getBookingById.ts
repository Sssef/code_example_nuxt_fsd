import { fetchUserBookings } from "#server/gateways/booking.api";
import { fetchSettings } from "#server/gateways/settings.api";
import { calculateBookingLifecycle } from "#server/services/bookings/bookingLifecycle";
import { getMovieSessionDetails } from "#server/services/movie-sessions/getMovieSessionDetails";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

export async function getBookingById(
  event: H3Event,
  bookingId: string,
  session: UserSession,
) {
  // 1. Получаем все бронирования пользователя
  const bookings = await fetchUserBookings(event, session);
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    throw createError({
      statusCode: 404,
      message: "Билет не найден",
    });
  }

  // 2. Получаем настройки (время на оплату)
  const settings = await fetchSettings(event);
  const paymentWindowTime = settings.bookingPaymentTimeSeconds;

  // 3. Получаем детали сеанса
  const movieSession = await getMovieSessionDetails(booking.movieSessionId);

  // 4. Рассчитываем жизненный цикл брони
  const now = Date.now();
  const lifecycle = calculateBookingLifecycle({
    isPaid: booking.isPaid,
    startTime: movieSession.startTime,
    bookedAt: booking.bookedAt,
    paymentWindowTime,
    now,
  });

  // 5. Возвращаем обогащённый билет
  return {
    ...booking,
    movieSession,
    ...lifecycle,
  };
}
