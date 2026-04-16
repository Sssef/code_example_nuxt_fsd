import type { Booking, Session } from "#common/model";

import { fetchUserBookings } from "#server/gateways/booking.api";
import { fetchSettings } from "#server/gateways/settings.api";
import { calculateBookingLifecycle } from "#server/services/bookings/bookingLifecycle";
import { getMovieSessionDetails } from "#server/services/movie-sessions/getMovieSessionDetails";
import { createConcurrencyLimiter } from "#server/utils/concurrency";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

export async function getMyTicketsPage(event: H3Event, session: UserSession) {
  const [bookings, settings] = await Promise.all([
    fetchUserBookings(event, session),
    fetchSettings(event),
  ]);

  if (bookings.length === 0) {
    return {
      bookings: [],
      settings,
    };
  }

  const paymentWindowTime = settings.bookingPaymentTimeSeconds;

  const movieSessionIds = [...new Set(bookings.map((b) => b.movieSessionId))];

  const limit = createConcurrencyLimiter(5);

  const movieSessions = await Promise.all(
    movieSessionIds.map((id) => limit(() => getMovieSessionDetails(id))),
  );

  const movieSessionMap = new Map(
    movieSessions.map((movieSession: Session) => [
      movieSession.id,
      movieSession,
    ]),
  );

  const now = Date.now();

  const refinedBookings = bookings.map((booking: Booking) => {
    const movieSession = movieSessionMap.get(booking.movieSessionId);

    if (!movieSession) {
      throw new Error(`Сеанс с id:${booking.movieSessionId} не найден`);
    }

    const lifecycle = calculateBookingLifecycle({
      isPaid: booking.isPaid,
      startTime: movieSession.startTime,
      bookedAt: booking.bookedAt,
      paymentWindowTime,
      now,
    });

    return {
      ...booking,
      movieSession,
      ...lifecycle,
    };
  });

  return {
    bookings: refinedBookings,
    settings,
  };
}
