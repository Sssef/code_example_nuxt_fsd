<script setup lang="ts">
import { AppPage, AppPageState } from "@shared/ui";

import MovieCatalog from "@widgets/movie-catalog/ui/MovieCatalog.vue";

import { useMoviesPageData } from "../model/useMoviesPageData";

const { movies, pending, error, isEmpty, firstMoviePoster } =
  useMoviesPageData();

useHead(() => ({
  link:
    firstMoviePoster.value && !pending.value
      ? [
          {
            rel: "preload",
            as: "image",
            href: firstMoviePoster.value,
            fetchpriority: "high",
          },
        ]
      : [],
}));
</script>

<template>
  <AppPage title="Фильмы" title-id="movies-heading">
    <AppPageState
      :pending="pending"
      :error="error"
      :is-empty="isEmpty"
      error-title="Ошибка загрузки фильмов"
      empty-title="Фильмы не найдены"
    >
      <template #loading>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <USkeleton class="h-60 rounded-lg" />
          <USkeleton class="h-60 rounded-lg" />
          <USkeleton class="h-60 rounded-lg" />
        </div>
      </template>

      <template #default>
        <section aria-labelledby="movies-heading">
          <MovieCatalog :movies="movies" />
        </section>
      </template>
    </AppPageState>
  </AppPage>
</template>
