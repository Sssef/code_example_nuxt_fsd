import type { BookedSeat } from "#common/model";

import { bookMovieSessionSeats } from "#server/gateways/movieSession.api";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

/**
 * Бронирует места на сеансе фильма
 * @param movieSessionId - ID сеанса фильма
 * @param seats - Массив забронированных мест
 * @param authHeaders - Заголовки авторизации
 * @returns Массив забронированных мест
 */
export async function bookMovieSession(
  event: H3Event,
  movieSessionId: number,
  seats: BookedSeat[],
  session: UserSession,
) {
  return bookMovieSessionSeats(event, movieSessionId, session, seats);
}
