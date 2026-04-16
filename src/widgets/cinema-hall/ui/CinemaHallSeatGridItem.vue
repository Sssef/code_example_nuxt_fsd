<script setup lang="ts">
import type { Seat } from "#common/model";

import { AppButton } from "@shared/ui";

const props = defineProps<{
  seat: Seat;
  selected: Set<string>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: string): void;
}>();

const isSelected = computed(() => props.selected.has(props.seat.id));

const onClick = () => {
  if (props.seat.isBooked || props.disabled) return;
  emit("toggle", props.seat.id);
};

const color = computed(() => {
  if (props.seat.isBooked) return "error";
  if (isSelected.value) return "primary";
  return "neutral";
});
</script>

<template>
  <AppButton
    size="xs"
    variant="outline"
    :color="color"
    :disabled="seat.isBooked || disabled"
    class="w-8 h-8 flex items-center justify-center cursor-pointer"
    @click="onClick"
  >
    {{ seat.seat }}
  </AppButton>
</template>
