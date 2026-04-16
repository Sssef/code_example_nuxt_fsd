<script setup lang="ts">
import type { Cinema } from "#common/model";

import { routes } from "@shared/routes";
import { AppCard, AppButton } from "@shared/ui";

interface Props {
  cinema: Cinema;
  showButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showButton: true,
});
</script>

<template>
  <AppCard>
    <template #header>
      <h3 class="text-lg font-semibold">{{ cinema.name }}</h3>
    </template>

    <p class="text-sm text-muted mt-4">Адрес: {{ cinema.address }}</p>

    <template #footer v-if="props.showButton">
      <AppButton
        :to="routes.cinemas({ id: cinema.id })"
        class="mt-4"
        variant="outline"
        color="neutral"
      >
        Посмотреть сеансы
      </AppButton>
    </template>
  </AppCard>
</template>
