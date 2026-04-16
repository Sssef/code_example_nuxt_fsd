import type { BookedSeat, MovieSessionDetails } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

import type { UserSession } from "#server/utils/auth/session";
import type { H3Event } from "h3";

export async function fetchMovieSessionById(
  movieSessionId: number,
): Promise<MovieSessionDetails> {
  return upstreamFetch<MovieSessionDetails>(`/movieSessions/${movieSessionId}`);
}

export async function bookMovieSessionSeats(
  event: H3Event,
  movieSessionId: number,
  session: UserSession,
  seats: BookedSeat[],
) {
  return upstreamFetch<BookedSeat[]>(
    event,
    `/movieSessions/${movieSessionId}/bookings`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.authToken}`,
      },
      body: { seats },
    },
  );
}
