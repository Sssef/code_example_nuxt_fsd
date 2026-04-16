<script setup lang="ts">
import { routes } from "@shared/routes";
import { AppButton } from "@shared/ui";

import { registrationFormSchema } from "../lib/registrationForm.schema";
import { useRegistrationForm } from "../model/useRegistrationForm";

const {
  isSubmitting,
  errorMessage,
  showPassword,
  showPasswordConfirmation,
  formState,
  submit,
  togglePasswordVisibility,
  togglePasswordConfirmationVisibility,
} = useRegistrationForm();
const toast = useToast();

const isRedirecting = ref(false);
const isBusy = computed(() => isSubmitting.value || isRedirecting.value);

const handleSubmit = async () => {
  if (isSubmitting.value) return;

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
    id: "register-success",
    title: "Успешная регистрация",
    description: "Вы успешно зарегистрировались в системе",
    color: "success",
  });

  isRedirecting.value = true;

  await navigateTo(routes.myTickets());
};
</script>

<template>
  <UForm
    data-testid="register-form"
    class="space-y-6"
    :schema="registrationFormSchema"
    :state="formState"
    @submit.prevent="handleSubmit"
    :disabled="isBusy"
  >
    <UFormField
      label="Логин"
      name="username"
      class="space-y-2"
      required
      data-testid="field-username"
    >
      <UInput
        class="w-full p-0.5"
        size="lg"
        autocomplete="username"
        v-model="formState.username"
        data-testid="input-username"
      />
    </UFormField>

    <UFormField
      label="Пароль"
      placeholder="••••••"
      name="password"
      class="space-y-2"
      required
      data-testid="field-password"
    >
      <UInput
        :type="showPassword ? 'text' : 'password'"
        class="w-full p-0.5"
        size="lg"
        autocomplete="new-password"
        v-model="formState.password"
        aria-label="Пароль"
        data-testid="input-password"
      >
        <template #trailing>
          <AppButton
            type="button"
            variant="ghost"
            color="neutral"
            :padded="false"
            size="sm"
            :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            @click="togglePasswordVisibility"
            :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
            :aria-pressed="showPassword"
            aria-controls="password"
            data-testid="toggle-password"
          />
        </template>
      </UInput>
    </UFormField>

    <UFormField
      label="Повторите пароль"
      placeholder="••••••"
      name="passwordConfirmation"
      class="space-y-2"
      required
      data-testid="field-password-confirmation"
    >
      <UInput
        :type="showPasswordConfirmation ? 'text' : 'password'"
        class="w-full p-0.5"
        size="lg"
        autocomplete="off"
        v-model="formState.passwordConfirmation"
        @paste.prevent
        data-testid="input-password-confirmation"
      >
        <template #trailing>
          <AppButton
            type="button"
            variant="ghost"
            color="neutral"
            :padded="false"
            size="sm"
            :icon="
              showPasswordConfirmation
                ? 'i-heroicons-eye-slash'
                : 'i-heroicons-eye'
            "
            :aria-label="
              showPasswordConfirmation ? 'Скрыть пароль' : 'Показать пароль'
            "
            :aria-pressed="showPasswordConfirmation"
            @click="togglePasswordConfirmationVisibility"
            data-testid="toggle-password-confirmation"
          />
        </template>
      </UInput>
    </UFormField>

    <div v-if="errorMessage" data-testid="server-error" class="mb-4">
      <UAlert
        color="error"
        variant="soft"
        icon="i-heroicons-exclamation-triangle"
      >
        <template #title>{{ errorMessage }}</template>
      </UAlert>
    </div>

    <AppButton
      data-testid="submit-register"
      type="submit"
      :loading="isBusy"
      :disabled="isBusy"
      class="w-full justify-center"
      size="lg"
    >
      Зарегистрироваться
    </AppButton>
  </UForm>
</template>
