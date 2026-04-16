import type { BookedSeat } from "#common/model";

export function mapSeatIdsToBookedSeats(seatIds: Set<string>): BookedSeat[] {
  return Array.from(seatIds).map((id) => {
    const [rowNumber, seatNumber] = id.split("-").map(Number);

    return { rowNumber, seatNumber };
  });
}
