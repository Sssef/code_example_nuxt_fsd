import type { Ticket } from "#common/model";

export type TicketListItem =
  | {
      type: "header";
      key: string;
      title: string;
      className: string;
    }
  | {
      type: "ticket";
      key: string;
      booking: Ticket;
    };
