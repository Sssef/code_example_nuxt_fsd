<script setup lang="ts">
import type { Ticket } from "#common/model";

import TicketsListItem from "./TicketsListItem.vue";
import TicketsListSection from "./TicketsListSection.vue";
import { useTicketsList } from "../model/useTicketsList";
import { useTicketsFilter } from "../model/useTicketsListFilter";

const props = defineProps<{
  bookings: Ticket[];
}>();

const emit = defineEmits<{
  "refresh-booking": [id: string];
}>();

const { tickets, remove, setTickets } = useTicketsList(props.bookings);
const categorized = useTicketsFilter(tickets);

watch(
  () => props.bookings,
  (newBookings) => {
    setTickets(newBookings);
  },
  { deep: true },
);

const onPaid = (id: string) => {
  emit("refresh-booking", id);
};

const onExpired = (id: string) => remove(id);
</script>

<template>
  <div class="space-y-10 min-h-128">
    <TicketsListSection
      title="Неоплаченные"
      section-id="unpaid"
      :show="categorized.unpaid.length > 0"
    >
      <TransitionGroup name="list" tag="div" class="space-y-4 list">
        <TicketsListItem
          v-for="b in categorized.unpaid"
          :key="b.id"
          :booking="b"
          @paid="onPaid"
          @expired="onExpired"
        />
      </TransitionGroup>
    </TicketsListSection>

    <TicketsListSection
      title="Будущие"
      section-id="upcoming"
      :show="categorized.upcoming.length > 0"
    >
      <TransitionGroup name="list" tag="div" class="space-y-4 list">
        <TicketsListItem
          v-for="b in categorized.upcoming"
          :key="b.id"
          :booking="b"
        />
      </TransitionGroup>
    </TicketsListSection>

    <TicketsListSection
      title="Прошедшие"
      section-id="past"
      :show="categorized.past.length > 0"
    >
      <TransitionGroup name="list" tag="div" class="space-y-4 list">
        <TicketsListItem
          v-for="b in categorized.past"
          :key="b.id"
          :booking="b"
        />
      </TransitionGroup>
    </TicketsListSection>
  </div>
</template>

<style scoped>
/* Стили для анимации списков билетов */
.list-enter-active,
.list-leave-active,
.list-move {
  transition: all var(--transition-slow, 0.4s) ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
  left: 0;
}

.list {
  position: relative;
}
</style>
