import type { RegistrationRequest } from "#common/model";

import { useAuth } from "@shared/auth";
import { getErrorMessage } from "@shared/lib/errors";

import type { RegistrationFormData } from "../lib/registrationForm.schema";

export const useRegistrationForm = () => {
  const auth = useAuth();

  const isSubmitting = ref(false);
  const showPassword = ref(false);
  const showPasswordConfirmation = ref(false);
  const errorMessage = ref<null | string>(null);

  const formState = reactive<RegistrationFormData>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const submit = async () => {
    if (isSubmitting.value) return null;

    errorMessage.value = null;
    isSubmitting.value = true;

    try {
      const registrationData: RegistrationRequest = {
        username: formState.username,
        password: formState.password,
      };
      await auth.register(registrationData);
      return true;
    } catch (error: unknown) {
      errorMessage.value = getErrorMessage(error, "Ошибка регистрации");
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const togglePasswordConfirmationVisibility = () => {
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
  };

  return {
    formState,
    showPassword,
    showPasswordConfirmation,
    isSubmitting,
    errorMessage,
    submit,
    togglePasswordVisibility,
    togglePasswordConfirmationVisibility,
  };
};
