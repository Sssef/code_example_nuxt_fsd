<script setup lang="ts">
import { AuthRegister } from "@pages/auth/register";

definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <AuthRegister />
</template>
