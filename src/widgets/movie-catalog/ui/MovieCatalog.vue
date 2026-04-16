<script setup lang="ts">
import type { Movie } from "#common/model";

import MovieCatalogCard from "./MovieCatalogCard.vue";

defineProps<{ movies: Movie[] }>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <MovieCatalogCard
      v-for="(movie, index) in movies"
      :key="movie.id"
      :movie="movie"
      :priority="index === 0"
    />
  </div>
</template>
