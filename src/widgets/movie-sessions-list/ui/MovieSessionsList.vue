<script setup lang="ts">
import type { Cinema, MovieSession } from "#common/model";

import { routes } from "@shared/routes";
import { AppCard, AppButton } from "@shared/ui";

import { useGroupMovieSessions } from "../model/useGroupMovieSessions";

const props = defineProps<{ sessions: MovieSession[]; cinemas: Cinema[] }>();
const { sessions, cinemas } = toRefs(props);

const groupedByDate = useGroupMovieSessions(sessions, cinemas);
</script>

<template>
  <section class="w-full">
    <div class="grid grid-cols-1 gap-4">
      <AppCard
        v-for="[day, daySessions] in groupedByDate"
        :key="day"
        :ui="{
          header: 'border-(--ui-border)',
        }"
        class="p-2"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-bold">{{ day }}</h2>
          </div>
        </template>

        <div
          v-for="[cinema, session] in daySessions"
          :key="cinema"
          class="flex justify-between gap-4 mb-8 last:mb-0"
        >
          <div class="w-full text-md text-left font-medium">{{ cinema }}:</div>
          <div
            class="flex gap-4 items-center"
            role="group"
            :aria-label="`Сеансы в кинотеатре ${cinema}`"
          >
            <AppButton
              v-for="s in session"
              :key="s.id"
              :to="routes.movieSession({ id: s.id })"
              variant="outline"
              color="neutral"
              :aria-label="`Сеанс в ${s.time}`"
            >
              {{ s.time }}
            </AppButton>
          </div>
        </div>
      </AppCard>
    </div>
  </section>
</template>
