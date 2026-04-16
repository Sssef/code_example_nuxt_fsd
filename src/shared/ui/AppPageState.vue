<script setup lang="ts">
import { getErrorMessage } from "@shared/lib/errors";

interface AppPageStateProps {
  pending: boolean;
  error?: unknown;
  isEmpty?: boolean;
  errorTitle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

defineProps<AppPageStateProps>();
</script>

<template>
  <template v-if="pending">
    <slot name="loading">
      <div class="space-y-4" data-testid="loading-state">
        <USkeleton class="h-6 w-64" />
        <USkeleton class="h-40 w-full" />
      </div>
    </slot>
  </template>

  <template v-else-if="error">
    <slot name="error" :message="getErrorMessage(error)">
      <UAlert
        color="error"
        variant="soft"
        :title="errorTitle ?? 'Ошибка'"
        :description="getErrorMessage(error)"
      />
    </slot>
  </template>

  <template v-else-if="isEmpty">
    <slot name="empty">
      <UAlert
        color="neutral"
        variant="soft"
        :title="emptyTitle ?? 'Пусто'"
        :description="emptyDescription ?? 'Нет данных для отображения'"
      />
    </slot>
  </template>

  <template v-else>
    <slot />
  </template>
</template>
