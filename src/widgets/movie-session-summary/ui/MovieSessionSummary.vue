<script setup lang="ts">
import { formatShortTime } from "@shared/lib/formatters/formatter";

defineProps<{
  sessionSummary: {
    movieTitle: string;
    cinemaName: string;
    startTime: string;
  };
}>();
</script>

<template>
  <div class="flex flex-col gap-1 mb-6">
    <p class="text-muted">
      Фильм: <span class="text-white">{{ sessionSummary.movieTitle }}</span>
    </p>
    <p class="text-muted">
      Кинотеатр: <span class="text-white">{{ sessionSummary.cinemaName }}</span>
    </p>
    <p class="text-muted">
      Время:
      <span class="text-white">{{
        formatShortTime(sessionSummary.startTime)
      }}</span>
    </p>
  </div>
</template>
