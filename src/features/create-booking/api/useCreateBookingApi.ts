import type { BookedSeat } from "#common/model";

import { useApiClient } from "@shared/api";

export const useCreateBookingApi = () => {
  const fetch = useApiClient();

  return {
    createBooking: async (sessionId: number, seats: BookedSeat[]) =>
      fetch<void>(`/api/movie-sessions/${sessionId}/bookings`, {
        method: "POST",
        body: { seats },
      }),
  };
};
