<script setup lang="ts">
import type { Cinema } from "#common/model";

import CinemaCatalogItem from "./CinemaCatalogItem.vue";

defineProps<{
  cinemas: Cinema[];
}>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CinemaCatalogItem
      v-for="cinema in cinemas"
      :key="cinema.id"
      :cinema="cinema"
    />
  </div>
</template>
