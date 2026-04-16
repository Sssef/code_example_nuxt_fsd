import type { Ticket } from "#common/model";

import { useApiClient } from "@shared/api";

// import { useApiClient } from "@shared/api";

export const useMyTicketsApi = () => {
  const fetch = useApiClient();

  return {
    getMyTickets: async () => fetch<{ bookings: Ticket[] }>("/api/my-tickets"),
    getMyTicketById: (id: string) => fetch<Ticket>(`/api/my-tickets/${id}`),
  };
};
