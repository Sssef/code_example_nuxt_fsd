import { getErrorMessage } from "@shared/lib/errors";

import { useCreateBookingApi } from "../api/useCreateBookingApi";
import { mapSeatIdsToBookedSeats } from "../lib/mapSeatIdsToBookedSeats";

export const useCreateBooking = (movieSessionId: number) => {
  const { createBooking } = useCreateBookingApi();

  const isBooking = ref<boolean>(false);
  const bookingError = ref<string | null>(null);

  const bookSeats = async (selectedSeatIds: Set<string>) => {
    if (isBooking.value) return { success: false };
    if (selectedSeatIds.size === 0) return { success: false };

    isBooking.value = true;
    bookingError.value = null;

    try {
      const seats = mapSeatIdsToBookedSeats(selectedSeatIds);
      await createBooking(movieSessionId, seats);
      return { success: true };
    } catch (error: unknown) {
      bookingError.value = getErrorMessage(
        error,
        "Не удалось забронировать билеты",
      );
      isBooking.value = false;
      return { success: false };
    }
  };

  return {
    isBooking,
    bookingError,
    bookSeats,
  };
};
