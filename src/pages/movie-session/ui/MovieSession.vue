<script setup lang="ts">
import { usePageSeo } from "@shared/lib/seo/usePageSeo";
import { AppPage, AppPageState } from "@shared/ui";

import { CinemaHall } from "@widgets/cinema-hall";
import { MovieSessionSummary } from "@widgets/movie-session-summary";

import { useMovieSessionPageData } from "../model/useMovieSessionPageData";

const { route, pageData, error, pending, sessionId } =
  useMovieSessionPageData();

usePageSeo({
  title: "Выбор мест",
  description:
    "Выберите места и завершите бронирование на странице сеанса Cinema Booking.",
  path: route.path,
  noindex: true,
});

const sessionSummary = computed(() => {
  if (!pageData.value) return null;
  return {
    movieTitle: pageData.value.movie.title,
    cinemaName: pageData.value.cinema.name,
    startTime: pageData.value.startTime,
  };
});
</script>

<template>
  <AppPage class="flex flex-col justify-center overflow-auto pb-5">
    <AppPageState :pending="pending" :error="error">
      <template v-if="pageData">
        <MovieSessionSummary
          v-if="sessionSummary"
          :session-summary="sessionSummary"
        />

        <CinemaHall
          :hall-seats="pageData.seats"
          :booked-seats="pageData.bookedSeats"
          :session-id="sessionId"
        />
      </template>
    </AppPageState>
  </AppPage>
</template>
