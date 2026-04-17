import type { Ticket } from "#common/model";

import { useMyTicketsApi } from "../api/useMyTicketsApi";

export const useMyTicketsPageData = () => {
  const { getMyTickets, getMyTicketById } = useMyTicketsApi();

  const {
    data: pageData,
    refresh,
    pending,
    error,
  } = useAsyncData("my-tickets-page", () => getMyTickets(), {
    lazy: true,
    server: false,
  });

  const isLoading = computed(() => pending.value || pageData.value === null);
  const isEmpty = computed(() => {
    if (isLoading.value || error.value) return false;
    return (pageData.value?.bookings?.length ?? 0) === 0;
  });

  const bookings = ref<Ticket[]>(pageData.value?.bookings ?? []);

  watch(
    pageData,
    (data) => {
      bookings.value = data?.bookings ? [...data.bookings] : [];
    },
    { immediate: true },
  );

  const updateBookingById = (updatedTicket: Ticket) => {
    const index = bookings.value.findIndex((b) => b.id === updatedTicket.id);
    if (index !== -1) {
      const newBookings = [...bookings.value];
      newBookings[index] = updatedTicket;
      bookings.value = newBookings;
    }
  };

  const refreshBooking = async (id: string) => {
    try {
      const fresh = await getMyTicketById(id);
      updateBookingById(fresh);
    } catch (err) {
      console.error("Не удалось обновить билет", err);
    }
  };

  return {
    bookings,
    refresh,
    refreshBooking,
    isLoading,
    isEmpty,
    error,
  };
};
