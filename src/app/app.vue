<script setup lang="ts">
import { useApiBaseUrl } from "#common/config";

const apiBaseUrl = useApiBaseUrl();

const apiOrigin = computed(() => {
  if (!apiBaseUrl) return null;

  return new URL(apiBaseUrl).origin;
});

useHead({
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} | Cinema Booking` : "Cinema Booking",
  bodyAttrs: {
    class: "bg-gray-900 text-gray-100 antialiased",
  },
  meta: [
    {
      charset: "utf-8",
    },
    {
      name: "description",
      content: "Система бронирования билетов в кинотеатр",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#111827",
    },
  ],
  link: apiOrigin.value
    ? [
        {
          rel: "preconnect",
          href: apiOrigin.value,
          crossorigin: "",
        },
        {
          rel: "dns-prefetch",
          href: apiOrigin.value,
        },
      ]
    : [],
});
</script>

<template>
  <UApp :toaster="{ position: 'top-right', progress: true }">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
