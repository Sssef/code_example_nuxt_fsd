<script setup lang="ts">
import { useApiBaseUrl } from "#common/config";
import type { Movie } from "#common/model";

import { formatDuration } from "@shared/lib/formatters/formatter";
import { routes } from "@shared/routes";
import { AppButton, AppCard } from "@shared/ui";

defineProps<{
  movie: Movie;
  priority?: boolean;
}>();

const baseURL = useApiBaseUrl();
</script>

<template>
  <AppCard>
    <template #header>
      <NuxtImg
        :src="`${baseURL}${movie.posterImage}`"
        :alt="`Постер фильма ${movie.title}`"
        width="140"
        height="200"
        sizes="(max-width: 767px) 140px, 140px"
        :loading="priority ? 'eager' : 'lazy'"
        :preload="priority"
        :fetchpriority="priority ? 'high' : 'auto'"
        format="webp"
        densities="x1 x2"
        class="rounded-md object-cover"
      />
      <h2 class="text-lg font-semibold">{{ movie.title }}</h2>
    </template>

    <template #default>
      <p class="text-muted">
        Продолжительность:
        {{ formatDuration(movie.lengthMinutes) }}
      </p>
      <p class="text-muted">Рейтинг: {{ movie.rating }}</p>
    </template>

    <template #footer>
      <AppButton
        :to="routes.movies({ id: movie.id })"
        variant="outline"
        color="neutral"
      >
        Посмотреть сеансы
      </AppButton>
    </template>
  </AppCard>
</template>
