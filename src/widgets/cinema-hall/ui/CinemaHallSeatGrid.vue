<script setup lang="ts">
import type { Seat } from "#common/model";

import CinemaHallSeatGridItem from "./CinemaHallSeatGridItem.vue";

defineProps<{
  disabled?: boolean;
  seatGrid: Seat[][];
  selectedSeatIds: Set<string>;
}>();

const emit = defineEmits<{
  (e: "toggle", seatId: string): void;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-2 items-center w-max p-4 sm:p-6"
    data-testid="seat-grid"
  >
    <!-- Сетка мест -->
    <div
      v-for="(row, rowIndex) in seatGrid"
      :key="`row-${rowIndex}-${row[0]?.row}`"
      class="grid gap-2"
      :style="{
        gridTemplateColumns: `auto repeat(${row.length}, minmax(0, 1fr)) auto`,
      }"
    >
      <!-- Номер ряда слева -->
      <div class="w-5 text-xs flex justify-center items-center text-muted">
        {{ row[0]?.row }}
      </div>

      <!-- Места -->
      <CinemaHallSeatGridItem
        v-for="seat in row"
        :key="seat.id"
        :seat="seat"
        :selected="selectedSeatIds"
        :disabled="disabled"
        @toggle="emit('toggle', $event)"
      />

      <!-- Номер ряда справа -->
      <div class="w-5 text-xs flex justify-center items-center text-muted">
        {{ row[0]?.row }}
      </div>
    </div>
  </div>
</template>
