<script setup lang="ts">
import { useApiBaseUrl } from "#common/config";
import type { MovieSession, Movie } from "#common/model";

import { routes } from "@shared/routes";
import { AppCard, AppButton } from "@shared/ui";

import { useGroupCinemaSessions } from "../model/useGroupCinemaSessions";

const props = defineProps<{
  sessions: MovieSession[];
  movies: Movie[];
}>();

const { sessions, movies } = toRefs(props);

const groupedByDate = useGroupCinemaSessions(sessions, movies);
const baseURL = useApiBaseUrl();
</script>

<template>
  <section class="w-full">
    <div class="grid grid-cols-1 gap-4">
      <AppCard
        v-for="[day, daySessions] in groupedByDate"
        :key="day"
        class="p-2"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">{{ day }}</span>
          </div>
        </template>

        <div
          v-for="[movie, session] in daySessions"
          :key="movie?.id"
          class="flex justify-between gap-4 mb-8 last:mb-0"
        >
          <div class="w-full flex items-center">
            <NuxtImg
              width="52"
              height="80"
              :src="baseURL + (movie?.posterImage || '')"
              :alt="movie ? `Постер фильма ${movie.title}` : 'Постер фильма'"
              sizes="52px"
              loading="lazy"
              format="webp"
              class="mr-6"
            />
            <p class="text-md">{{ movie?.title }}</p>
          </div>
          <div class="flex gap-4 items-center">
            <AppButton
              v-for="s in session"
              :key="s.id"
              :to="routes.movieSession({ id: s.id })"
              variant="outline"
              color="neutral"
            >
              {{ s.time }}
            </AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  </section>
</template>
