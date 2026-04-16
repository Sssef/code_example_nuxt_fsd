<script setup lang="ts">
import type { Ticket } from "#common/model";

import {
  formatShortDate,
  formatShortTime,
} from "@shared/lib/formatters/formatter";
import { AppCard } from "@shared/ui";

import { PayBooking } from "@features/pay-booking";

import { groupSeatsByRow } from "../lib/groupSeatsByRow";

const props = defineProps<{ booking: Ticket }>();
const emit = defineEmits<{
  paid: [id: string];
  expired: [id: string];
}>();

const startDate = computed(
  () => new Date(props.booking.movieSession.startTime),
);
const formattedDate = computed(() => formatShortDate(startDate.value));
const formattedTime = computed(() => formatShortTime(startDate.value));
const seatsByRow = computed(() => groupSeatsByRow(props.booking.seats));
</script>

<template>
  <AppCard class="hover:shadow-md transition-shadow duration-200">
    <div class="grid items-center grid-cols-1 md:grid-cols-3 gap-6">
      <div class="flex flex-col gap-1 text-left">
        <p class="font-medium text-base">
          {{ booking.movieSession.movie.title }}
        </p>
        <p class="text-muted">{{ booking.movieSession.cinema.name }}</p>
        <p class="text-muted">{{ formattedDate }} - {{ formattedTime }}</p>
      </div>

      <div class="flex flex-col gap-4 text-sm min-w-40 text-left">
        <div v-for="row in seatsByRow" :key="row.row">
          <p class="text-muted">
            Ряд: <span class="text-white">{{ row.row }}</span>
          </p>
          <p class="text-muted">
            Места: <span class="text-white">{{ row.seats.join(", ") }}</span>
          </p>
        </div>
      </div>

      <PayBooking
        :booking="booking"
        @paid="emit('paid', $event)"
        @expired="emit('expired', $event)"
      />
    </div>
  </AppCard>
</template>
