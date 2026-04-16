import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

import type { Cinema } from "#common/model";

import { useCinemasApi } from "../api/useCinemasApi";

export function useCinemasPageData() {
  const { getCinemas } = useCinemasApi();

  const {
    data: cinemas,
    error,
    pending,
  } = useAsyncData<Cinema[]>("cinemas-list", () => getCinemas(), {
    default: () => [],
    server: true,
  });

  const isEmpty = computed(() => {
    if (pending.value || error.value) return false;
    return cinemas.value.length === 0;
  });

  return {
    cinemas,
    error,
    pending,
    isEmpty,
  };
}
