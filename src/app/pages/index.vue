<script setup lang="ts">
import { routes } from "@shared/routes";

import { Main } from "@pages/main";

definePageMeta({
  middleware: () => {
    return navigateTo(routes.movies());
  },
});
</script>

<template>
  <Main />
</template>
