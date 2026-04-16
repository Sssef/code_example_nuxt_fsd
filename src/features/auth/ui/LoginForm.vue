<script setup lang="ts">
import { loginSchema } from "#common/lib/validation";

import { routes } from "@shared/routes";
import { AppButton } from "@shared/ui";

import { useLoginForm } from "../model/useLoginForm";

const {
  formState,
  showPassword,
  isSubmitting,
  errorMessage,
  submit,
  togglePasswordVisibility,
} = useLoginForm();
const toast = useToast();

const isRedirecting = ref(false);
const isBusy = computed(() => isSubmitting.value || isRedirecting.value);

const onSubmit = async () => {
  if (isBusy.value) return;

  const result = await submit();
  if (result === null) return;

  if (!result) {
    toast.add({
      title: "Ошибка авторизации",
      description: errorMessage.value ?? undefined,
      color: "error",
    });
    return;
  }

  toast.add({
    title: "Приветствуем!",
    description: "Авторизация прошла успешно",
    color: "success",
  });

  isRedirecting.value = true;

  await navigateTo(routes.myTickets());
};
</script>

<template>
  <UForm
    class="space-y-6"
    :schema="loginSchema"
    :state="formState"
    @submit.prevent="onSubmit"
    :disabled="isBusy"
  >
    <UFormField label="Логин" name="username" class="space-y-2" required>
      <UInput
        class="w-full p-0.5"
        size="lg"
        autocomplete="username"
        v-model="formState.username"
      />
    </UFormField>

    <UFormField
      label="Пароль"
      placeholder="••••••"
      name="password"
      class="space-y-2"
      required
    >
      <UInput
        :type="showPassword ? 'text' : 'password'"
        class="w-full p-0.5"
        size="lg"
        autocomplete="current-password"
        v-model="formState.password"
        aria-label="Пароль"
      >
        <template #trailing>
          <AppButton
            type="button"
            variant="ghost"
            color="neutral"
            :padded="false"
            size="sm"
            :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            :aria-pressed="showPassword"
            @click="togglePasswordVisibility"
          />
        </template>
      </UInput>
    </UFormField>

    <AppButton
      :loading="isBusy"
      :disabled="isBusy"
      type="submit"
      class="w-full justify-center"
      size="lg"
    >
      Войти
    </AppButton>

    <UAlert
      v-if="errorMessage"
      :title="errorMessage"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="outline"
      class="mt-4 flex items-center justify-center"
      aria-live="polite"
    />
  </UForm>
</template>
