import { BOOKING_STATUS, type Ticket } from "#common/model";

export const useTicketsFilter = (tickets: Ref<Ticket[]>) => {
  return computed(() => {
    const result = {
      unpaid: [] as Ticket[],
      upcoming: [] as Ticket[],
      past: [] as Ticket[],
    };

    for (const t of tickets.value) {
      if (!t.isPaid) {
        result.unpaid.push(t);
        continue;
      }

      switch (t.status) {
        case BOOKING_STATUS.UPCOMING:
          result.upcoming.push(t);
          break;
        case BOOKING_STATUS.PAST:
          result.past.push(t);
          break;
        default:
          result.upcoming.push(t);
      }
    }
    return result;
  });
};
