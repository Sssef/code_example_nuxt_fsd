import type { BookedSeat, MovieSessionPageData } from "#common/model";

export const BOOKING_STATUS = {
  UNPAID: "UNPAID",
  UPCOMING: "UPCOMING",
  PAST: "PAST",
} as const;

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export interface Ticket {
  id: string;
  movieSessionId: number;
  bookedAt: string;
  isPaid: boolean;
  seats: BookedSeat[];
  movieSession: MovieSessionPageData;
  expiresAt: string | null;
  remainingSeconds: number | null;
  status: BookingStatus;
}
