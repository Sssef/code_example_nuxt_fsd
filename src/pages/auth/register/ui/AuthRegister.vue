<script setup lang="ts">
import { usePageSeo } from "@shared/lib/seo/usePageSeo";
import { routes } from "@shared/routes";
import { AppCard, AppPage } from "@shared/ui";

import { RegisterForm } from "@features/auth";

usePageSeo({
  title: "Регистрация",
  description:
    "Создайте аккаунт в Cinema Booking, чтобы бронировать билеты и отслеживать свои сеансы.",
  path: routes.auth.register(),
  noindex: true,
});
</script>

<template>
  <AppPage>
    <div class="text-center">
      <UIcon
        name="i-heroicons-user-plus"
        class="text-6xl text-green-500 mx-auto"
        aria-hidden="true"
      />
      <h1 class="mt-6 text-3xl font-bold">Регистрация</h1>
      <p class="mt-2 text-muted">Введите данные для регистрации</p>
    </div>

    <AppCard class="max-w-md mx-auto">
      <RegisterForm />
    </AppCard>

    <div class="text-center pt-6 border-t border-gray-800 w-max mx-auto">
      <p class="text-muted">
        Уже есть аккаунт?
        <NuxtLink
          :to="routes.auth.login()"
          class="underline underline-offset-3 text-green-500"
        >
          Войти
        </NuxtLink>
      </p>
    </div>
  </AppPage>
</template>
