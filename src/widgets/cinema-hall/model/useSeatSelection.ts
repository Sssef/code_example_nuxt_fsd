import { useAuth } from "@shared/auth";

export const useSeatSelection = () => {
  const { isAuthenticated } = useAuth();

  const selected = reactive<Set<string>>(new Set());

  const toggle = (id: string) => {
    if (!isAuthenticated.value) return;

    if (selected.has(id)) {
      selected.delete(id);
    } else {
      selected.add(id);
    }
  };

  const clear = () => {
    selected.clear();
  };

  return {
    selected,
    toggle,
    clear,
  };
};
