<script setup lang="ts">
import { usePageSeo } from "@shared/lib/seo/usePageSeo";
import { routes } from "@shared/routes";
import { AppCard, AppPage } from "@shared/ui";

import { LoginForm } from "@features/auth";

usePageSeo({
  title: "Вход",
  description:
    "Войдите в Cinema Booking, чтобы управлять бронированиями и билетами.",
  path: routes.auth.login(),
  noindex: true,
});
</script>

<template>
  <AppPage>
    <template #header>
      <div class="text-center">
        <UIcon
          name="i-heroicons-arrow-left-on-rectangle"
          class="text-6xl text-green-500 mx-auto"
          aria-hidden="true"
        />
        <h1 class="mt-6 text-3xl font-bold">Вход в систему</h1>
        <p class="mt-2 text-muted">Введите ваши учетные данные</p>
      </div>
    </template>

    <AppCard class="max-w-md mx-auto">
      <LoginForm />
    </AppCard>

    <div class="text-center pt-6 border-t border-gray-800 w-max mx-auto">
      <p class="text-muted">
        Нет аккаунта?
        <NuxtLink
          :to="routes.auth.register()"
          class="underline underline-offset-3 text-green-500"
        >
          Зарегистрироваться
        </NuxtLink>
      </p>
    </div>
  </AppPage>
</template>
