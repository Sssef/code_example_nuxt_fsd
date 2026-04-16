export const groupSeatsByRow = (
  seats: {
    rowNumber: number;
    seatNumber: number;
  }[],
) => {
  const map = new Map<number, number[]>();

  for (const seat of seats) {
    if (!map.has(seat.rowNumber)) {
      map.set(seat.rowNumber, []);
    }

    map.get(seat.rowNumber)!.push(seat.seatNumber);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([row, seats]) => ({
      row,
      seats: seats.sort((a, b) => a - b),
    }));
};
