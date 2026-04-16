import type { BookedSeat, Seat, SeatLayout } from "#common/model";

/**
 * Генерирует сетку мест для кинозала
 * @param layout - Расположение мест в зале
 * @param bookedSeats - Забронированные места
 * @returns Двумерный массив мест с информацией о бронировании
 */
export const generateSeatGrid = (
  layout: SeatLayout,
  bookedSeats?: BookedSeat[],
): Seat[][] => {
  const bookedSeatSet = new Set(
    bookedSeats?.map((seat) => `${seat.rowNumber}-${seat.seatNumber}`),
  );

  return Array.from({ length: layout.rows }, (_, rowIndex) =>
    Array.from({ length: layout.seatsPerRow }, (_, seatIndex) => {
      const row = rowIndex + 1;
      const seat = seatIndex + 1;
      const id = `${row}-${seat}`;

      return {
        id,
        row,
        seat,
        isBooked: bookedSeatSet.has(id),
      };
    }),
  );
};
