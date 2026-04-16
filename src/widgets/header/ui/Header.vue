<script setup lang="ts">
import { useAuth } from "@shared/auth";
import { routes } from "@shared/routes";
import { AppButton } from "@shared/ui";

import HeaderMobileMenu from "./HeaderMobileMenu.vue";

const { logout, isAuthenticated } = useAuth();

const onLogout = async () => {
  await logout();
  await navigateTo(routes.movies());
};
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink
          to="#main-content"
          class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-md focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к основному контенту
        </NuxtLink>

        <NuxtLink :to="routes.movies()" class="flex items-center gap-2">
          <UIcon
            name="i-heroicons-ticket"
            class="w-6 h-6 text-primary-400"
            aria-hidden="true"
          />
          <span class="text-xl font-bold">Cinema Booking</span>
        </NuxtLink>

        <nav class="hidden items-center gap-6 md:flex" aria-label="Основная">
          <NuxtLink
            :to="routes.movies()"
            class="text-gray-300 hover:text-white transition-colors"
            active-class="text-white"
          >
            Фильмы
          </NuxtLink>
          <NuxtLink
            :to="routes.cinemas()"
            class="text-gray-300 hover:text-white transition-colors"
            active-class="text-white"
          >
            Кинотеатры
          </NuxtLink>
          <NuxtLink
            :to="routes.myTickets()"
            class="text-gray-300 hover:text-white transition-colors"
            active-class="text-white"
          >
            Мои билеты
          </NuxtLink>

          <div v-if="!isAuthenticated" class="ml-4">
            <AppButton :to="routes.auth.login()" variant="ghost" label="Вход" />
          </div>
          <div v-else class="ml-4">
            <AppButton
              @click="onLogout"
              variant="ghost"
              label="Выход"
              class="cursor-pointer"
            />
          </div>
        </nav>

        <HeaderMobileMenu />
      </div>
    </div>
  </header>
</template>
