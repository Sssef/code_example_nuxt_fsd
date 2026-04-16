import { useApiClient } from "@shared/api";

export const usePayBookingApi = () => {
  const fetch = useApiClient();

  return {
    payBooking: async (bookingId: string) =>
      fetch<void>(`/api/bookings/${bookingId}/payments`, {
        method: "POST",
      }),
  };
};
