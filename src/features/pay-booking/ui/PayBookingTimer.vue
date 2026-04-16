<script setup lang="ts">
import { useSharedNow } from "@shared/lib/time/useSharedNow";

const props = defineProps<{ expiresAt: string }>();
const emit = defineEmits<{ expired: [] }>();
const now = useSharedNow();

const remainingSeconds = computed(() => {
  const diff = new Date(props.expiresAt).getTime() - now.value.getTime();
  return Math.max(Math.floor(diff / 1000), 0);
});

watch(remainingSeconds, (value) => {
  if (value === 0) emit("expired");
});

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60);
  const seconds = remainingSeconds.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
</script>

<template>
  <span
    v-if="remainingSeconds > 0"
    class="inline-flex min-w-28 justify-end tabular-nums text-warning"
  >
    Оплатить за {{ formattedTime }}
  </span>
  <span v-else class="inline-flex min-w-28 justify-end text-error">
    Время оплаты истекло
  </span>
</template>
