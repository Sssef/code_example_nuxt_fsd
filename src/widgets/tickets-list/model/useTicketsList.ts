import type { Ticket } from "#common/model";

export const useTicketsList = (initial: Ticket[]) => {
  const tickets = ref<Ticket[]>([...initial]);

  const remove = (id: string) => {
    tickets.value = tickets.value.filter((t) => t.id !== id);
  };

  const setTickets = (newTickets: Ticket[]) => {
    tickets.value = [...newTickets];
  };

  return { tickets, remove, setTickets };
};
