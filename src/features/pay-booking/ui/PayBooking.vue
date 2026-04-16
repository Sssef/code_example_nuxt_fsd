<script setup lang="ts">
import { BOOKING_STATUS, type Ticket } from "#common/model";

import { AppButton } from "@shared/ui";

import PayBookingTimer from "./PayBookingTimer.vue";
import { usePayBooking } from "../model/usePayBooking";

const props = defineProps<{ booking: Ticket }>();
const emit = defineEmits<{
  paid: [id: string];
  expired: [id: string];
}>();

const { pay, isPaying, isPaidOrPaying, processingLabel } = usePayBooking();

const onPayClick = async () => {
  if (isPaying(props.booking.id).value) return;
  const success = await pay(props.booking.id);
  if (success) {
    emit("paid", props.booking.id);
  }
};

const onExpired = () => emit("expired", props.booking.id);
</script>

<template>
  <div class="flex items-center gap-6 min-w-40 justify-end">
    <PayBookingTimer
      v-if="booking.status === BOOKING_STATUS.UNPAID && booking.expiresAt"
      :expires-at="booking.expiresAt"
      @expired="onExpired"
    />
    <AppButton
      v-if="!booking.isPaid"
      :loading="isPaying(booking.id).value"
      :disabled="isPaidOrPaying(booking.id).value"
      @click="onPayClick"
      :label="processingLabel"
    />
  </div>
</template>
