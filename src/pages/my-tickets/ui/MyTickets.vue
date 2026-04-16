<script setup lang="ts">
import { routes } from "@shared/routes";
import { AppPageState, AppCard, AppButton, AppPage } from "@shared/ui";

import { TicketsList } from "@widgets/tickets-list";

import { useMyTicketsPageData } from "../model/useMyTicketsPageData";

const { bookings, refreshBooking, error, isEmpty, isLoading } =
  useMyTicketsPageData();

const onRefreshBooking = (id: string) => {
  refreshBooking(id);
};
</script>

<template>
  <AppPage title="Мои билеты">
    <AppPageState
      :pending="isLoading"
      :error="error"
      :is-empty="isEmpty"
      error-title="Ошибка загрузки билетов"
    >
      <template #loading>
        <div class="flex flex-col">
          <div class="space-y-6">
            <USkeleton class="h-10 w-48" />
            <USkeleton class="h-35 w-full rounded-lg" />
          </div>
          <div class="space-y-6 mt-10">
            <USkeleton class="h-10 w-48" />
            <USkeleton class="h-35 w-full rounded-lg" />
          </div>
        </div>
      </template>

      <template #empty>
        <AppCard class="p-8 text-center space-y-4">
          <UIcon
            name="i-heroicons-ticket"
            class="w-12 h-12 text-muted mx-auto"
          />
          <h2 class="text-lg font-semibold">У вас пока нет билетов</h2>
          <p class="text-muted">
            Забронируйте билеты на сеанс, и они появятся здесь
          </p>
          <AppButton
            :to="routes.movies()"
            color="neutral"
            variant="outline"
            size="lg"
            class="mt-4"
          >
            Перейти к фильмам
          </AppButton>
        </AppCard>
      </template>

      <template #default>
        <TicketsList :bookings="bookings" @refresh-booking="onRefreshBooking" />
      </template>
    </AppPageState>
  </AppPage>
</template>
