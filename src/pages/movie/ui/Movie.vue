<script setup lang="ts">
import { AppPage, AppPageState } from "@shared/ui";

import { MovieInfo } from "@widgets/movie-info";
import { MovieSessionsList } from "@widgets/movie-sessions-list";

import { useMoviePageData } from "../model/useMoviePageData";

const { movie, cinemas, movieSessions, isLoading, isEmpty, error } =
  useMoviePageData();
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
        <USkeleton height="32px" width="200px" />
      </template>

      <template #default v-if="movie && movieSessions && cinemas">
        <MovieInfo :movie="movie" />
        <MovieSessionsList :sessions="movieSessions" :cinemas="cinemas" />
      </template>
    </AppPageState>
  </AppPage>
</template>
