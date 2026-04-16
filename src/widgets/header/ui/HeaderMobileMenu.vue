<script setup lang="ts">
import { useAuth } from "@shared/auth";
import { routes } from "@shared/routes";
import { AppButton } from "@shared/ui";

const { logout, isAuthenticated } = useAuth();

const onLogout = async () => {
  await logout();
  await navigateTo(routes.movies());
};

const mobileMenuItems = computed(() => {
  return [
    [
      {
        label: "Фильмы",
        icon: "i-heroicons-film",
        to: routes.movies(),
      },
      {
        label: "Кинотеатры",
        icon: "i-heroicons-building-office",
        to: routes.cinemas(),
      },
      {
        label: "Мои билеты",
        icon: "i-heroicons-ticket",
        to: routes.myTickets(),
      },
    ],
    [
      {
        label: isAuthenticated.value ? "Выход" : "Вход",
        icon: isAuthenticated.value
          ? "i-heroicons-arrow-right-on-rectangle"
          : "i-heroicons-arrow-left-on-rectangle",
        click: () =>
          isAuthenticated.value ? onLogout() : navigateTo(routes.auth.login()),
      },
    ],
  ];
});
</script>

<template>
  <div class="md:hidden">
    <UDropdownMenu :items="mobileMenuItems">
      <AppButton
        icon="i-heroicons-bars-3"
        variant="ghost"
        aria-label="Открыть меню навигации"
      />
    </UDropdownMenu>
  </div>
</template>
