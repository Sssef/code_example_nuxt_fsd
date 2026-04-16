import type { LoginRequest } from "#common/model";

import { useAuth } from "@shared/auth";
import { getErrorMessage } from "@shared/lib/errors";

export const useLoginForm = () => {
  const auth = useAuth();

  const isSubmitting = ref(false);
  const errorMessage = ref<string | null>(null);
  const showPassword = ref(false);

  const formState = reactive<LoginRequest>({ username: "", password: "" });

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const submit = async () => {
    if (isSubmitting.value) return null;

    errorMessage.value = null;
    isSubmitting.value = true;

    try {
      await auth.login(formState);
      return true;
    } catch (error: unknown) {
      errorMessage.value = getErrorMessage(error, "Ошибка авторизации");
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    formState,
    showPassword,
    errorMessage,
    isSubmitting,
    submit,
    togglePasswordVisibility,
  };
};
