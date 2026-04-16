<script setup lang="ts">
import { usePageSeo } from "@shared/lib/seo/usePageSeo";
import { routes } from "@shared/routes";
import { AppPage, AppPageState } from "@shared/ui";

import { CinemaCatalog } from "@widgets/cinema-catalog";

import { useCinemasPageData } from "../model/useCinemasPageData";

usePageSeo({
  title: "Кинотеатры",
  description:
    "Откройте кинотеатр, посмотрите доступные фильмы и ближайшие сеансы.",
  path: routes.cinemas(),
});

const { cinemas, pending, error, isEmpty } = useCinemasPageData();
</script>

<template>
  <AppPage title="Кинотеатры" id="cinemas-heading">
    <AppPageState
      :pending="pending"
      :error="error"
      :is-empty="isEmpty"
      error-title="Ошибка загрузки кинотеатров"
      empty-title="Кинотеатры не найдены"
    >
      <template #loading>
        <div class="cinemas-grid">
          <USkeleton class="h-60 rounded-lg" />
          <USkeleton class="h-60 rounded-lg" />
          <USkeleton class="h-60 rounded-lg" />
        </div>
      </template>

      <template #default>
        <section aria-labelledby="cinemas-heading">
          <CinemaCatalog :cinemas="cinemas" />
        </section>
      </template>
    </AppPageState>
  </AppPage>
</template>
