import { BOOKING_STATUS, type Ticket } from "#common/model";

export const markBookings = (bookings: Ref<Ticket[]> | Ticket[]) => {
  const getBookings = () => (isRef(bookings) ? bookings.value : bookings);

  const setBookings = (nextBookings: Ticket[]) => {
    if (isRef(bookings)) {
      bookings.value = nextBookings;
      return;
    }

    bookings.splice(0, bookings.length, ...nextBookings);
  };

  const paid = (bookingId: string) => {
    const booking = getBookings().find((item) => item.id === bookingId);

    if (!booking) return;

    booking.isPaid = true;
    booking.status = BOOKING_STATUS.UPCOMING;
    booking.remainingSeconds = null;
  };

  const remove = (bookingId: string) => {
    setBookings(getBookings().filter((item) => item.id !== bookingId));
  };

  return {
    paid,
    remove,
  };
};
