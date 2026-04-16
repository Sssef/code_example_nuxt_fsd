import { useNow } from "@vueuse/core";

import type { Ref } from "vue";

/**
 * Один интервал на всё таймеры.
 */
export const useSharedNow = (): Ref<Date> => {
  const state = useState<Date>("shared-now", () => new Date());

  if (import.meta.client) {
    const now = useNow({ interval: 1000 });

    watchEffect(() => {
      state.value = now.value;
    });
  }

  return state;
};
