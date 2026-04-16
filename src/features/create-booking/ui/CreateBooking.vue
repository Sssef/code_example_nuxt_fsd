<script setup lang="ts">
import { useAuth } from "@shared/auth";
import { AppButton } from "@shared/ui";

import { useCreateBooking } from "../model/useCreateBooking";

const props = defineProps<{
  sessionId: number;
  selectedSeatIds: Set<string>;
}>();

const emit = defineEmits<{
  success: [];
  error: [message: string];
  unauthenticated: [];
}>();

const { isAuthenticated } = useAuth();
const { bookSeats, isBooking, bookingError } = useCreateBooking(
  props.sessionId,
);

const handleBooking = async () => {
  if (isBooking.value) return;

  if (!isAuthenticated.value) {
    emit("unauthenticated");
    return;
  }

  const result = await bookSeats(props.selectedSeatIds);
  if (result.success) {
    emit("success");
  } else if (bookingError.value) {
    emit("error", bookingError.value);
  }
};
</script>

<template>
  <div class="flex flex-col items-center gap-4 mt-6">
    <AppButton
      v-if="isAuthenticated"
      :disabled="selectedSeatIds.size === 0 || isBooking"
      :loading="isBooking"
      @click="handleBooking"
    >
      Забронировать ({{ selectedSeatIds.size }})
    </AppButton>

    <AppButton color="neutral" v-else @click="emit('unauthenticated')">
      Войти, чтобы забронировать
    </AppButton>

    <UAlert
      v-if="bookingError"
      color="error"
      variant="soft"
      :title="bookingError"
    />
  </div>
</template>
