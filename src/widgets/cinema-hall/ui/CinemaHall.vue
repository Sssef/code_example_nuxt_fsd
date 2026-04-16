<script setup lang="ts">
import type { BookedSeat, SeatLayout } from "#common/model";

import { useAuth } from "@shared/auth";
import { routes } from "@shared/routes";
import { AppCard } from "@shared/ui";

import { CreateBooking } from "@features/create-booking";

import CinemaHallSeatGrid from "./CinemaHallSeatGrid.vue";
import { generateSeatGrid } from "../lib/generateSeatGrid";
import { useSeatSelection } from "../model/useSeatSelection";

const props = defineProps<{
  hallSeats: SeatLayout;
  sessionId: number;
  bookedSeats?: BookedSeat[];
}>();

const { isAuthenticated } = useAuth();
const { selected, toggle, clear } = useSeatSelection();

onUnmounted(clear);

const seats = computed(() => props.hallSeats ?? null);
const booked = computed(() => props.bookedSeats ?? null);

const seatGrid = computed(() => {
  if (!seats.value) return [];
  return generateSeatGrid(seats.value, booked.value ?? []);
});

const handleBookingSuccess = async () => {
  await navigateTo(routes.myTickets());
};

const handleUnauthenticated = () => {
  navigateTo(routes.auth.login());
};
</script>

<template>
  <AppCard
    class="m-auto w-max overflow-auto"
    :ui="{
      header: 'border-(--ui-border)',
      body: 'p-0 sm:p-0 w-auto',
    }"
  >
    <template #header>
      <div class="text-center text-lg uppercase">Экран</div>
    </template>

    <CinemaHallSeatGrid
      :seat-grid="seatGrid"
      :selected-seat-ids="selected"
      :disabled="!isAuthenticated"
      @toggle="toggle"
    />
  </AppCard>

  <CreateBooking
    :session-id="sessionId"
    :selected-seat-ids="selected"
    @success="handleBookingSuccess"
    @unauthenticated="handleUnauthenticated"
  />
</template>
