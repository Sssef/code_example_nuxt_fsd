import { BOOKING_STATUS, type BookingStatus } from "#common/model";

export type BookingLifecycle = {
  expiresAt: string | null;
  status: BookingStatus;
};

type Params = {
  isPaid: boolean;
  startTime: string;
  bookedAt: string;
  paymentWindowTime: number;
  now: number;
};

export function calculateBookingLifecycle({
  isPaid,
  startTime,
  bookedAt,
  paymentWindowTime,
  now,
}: Params): BookingLifecycle {
  if (isPaid) {
    const isPast = new Date(startTime).getTime() <= now;

    return {
      expiresAt: null,
      status: isPast ? BOOKING_STATUS.PAST : BOOKING_STATUS.UPCOMING,
    };
  }

  const expiresTimestamp =
    new Date(bookedAt).getTime() + paymentWindowTime * 1000;

  const expiresAt = new Date(expiresTimestamp).toISOString();

  if (expiresTimestamp <= now) {
    return {
      expiresAt,
      status: BOOKING_STATUS.PAST,
    };
  }

  return {
    expiresAt,
    status: BOOKING_STATUS.UNPAID,
  };
}
