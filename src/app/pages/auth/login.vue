<script setup lang="ts">
import { AuthLogin } from "@pages/auth/login";

definePageMeta({
  middleware: "guest",
});
</script>

<template>
  <AuthLogin />
</template>
