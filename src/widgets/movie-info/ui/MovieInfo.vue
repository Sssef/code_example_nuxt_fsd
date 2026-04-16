<script setup lang="ts">
import { useApiBaseUrl } from "#common/config";
import type { Movie } from "#common/model";

import { formatDuration } from "@shared/lib/formatters/formatter";
import { AppCard } from "@shared/ui";

defineProps<{ movie: Movie }>();

const baseURL = useApiBaseUrl();
</script>

<template>
  <AppCard class="hover:shadow-md transition-shadow duration-200">
    <div class="flex flex-col gap-6 sm:flex-row sm:gap-10">
      <NuxtImg
        :src="`${baseURL}${movie.posterImage}`"
        :alt="`Постер фильма ${movie.title}`"
        width="200"
        height="300"
        sizes="(max-width: 640px) 160px, 200px"
        loading="eager"
        format="webp"
        class="mx-auto rounded-lg object-cover sm:mx-0"
      />

      <div class="flex flex-col flex-3 text-left">
        <h1 class="text-xl font-semibold mb-4">
          {{ movie.title }}
        </h1>

        <p class="mb-6">{{ movie.description }}</p>

        <div class="flex flex-col">
          <p class="text-muted">Год: {{ movie.year }}</p>
          <p class="text-muted">
            Продолжительность: {{ formatDuration(movie.lengthMinutes) }}
          </p>
          <p class="text-muted">Рейтинг: {{ movie.rating }}</p>
        </div>
      </div>
    </div>
  </AppCard>
</template>
