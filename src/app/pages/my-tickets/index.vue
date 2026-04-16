<script setup lang="ts">
import { MyTickets } from "@pages/my-tickets";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <MyTickets />
</template>
