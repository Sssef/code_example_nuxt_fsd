<script setup lang="ts">
import { usePageSeo } from "@shared/lib/seo/usePageSeo";
import { AppPage, AppPageState } from "@shared/ui";

import { CinemaCard } from "@widgets/cinema-card";
import { CinemaSessionsList } from "@widgets/cinema-sessions-list";

import { useCinemaPageData } from "../model/useCinemaPageData";

const { cinema, movies, sessions, isLoading, error, isEmpty, route } =
  useCinemaPageData();

usePageSeo(
  computed(() => {
    if (!cinema.value) {
      return {
        title: "Карточка кинотеатра",
        description:
          "Откройте кинотеатр, посмотрите доступные фильмы и ближайшие сеансы.",
        path: route.path,
      };
    }

    return {
      title: cinema.value.name,
      description: `Адрес: ${cinema.value.address}. Посмотрите сеансы и выберите фильм в кинотеатре ${cinema.value.name}.`,
      path: route.path,
    };
  }),
);
</script>

<template>
  <AppPage>
    <AppPageState
      :pending="isLoading"
      :error="error"
      error-title="Ошибка загрузки страницы"
      :is-empty="isEmpty"
    >
      <template #loading>
        <div class="space-y-6 min-h-128">
          <USkeleton class="h-30 w-full rounded-lg" />
          <USkeleton class="h-60 w-full rounded-lg" />
        </div>
        <div class="mt-6 min-h-60">
          <USkeleton class="h-60 w-full rounded-lg" />
        </div>
      </template>

      <template #default v-if="cinema && movies && sessions">
        <CinemaCard :cinema="cinema" :show-button="false" />
        <CinemaSessionsList :sessions="sessions" :movies="movies" />
      </template>
    </AppPageState>
  </AppPage>
</template>
