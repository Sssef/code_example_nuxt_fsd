import { getErrorMessage } from "@shared/lib/errors";
import { getHttpStatusCode } from "@shared/lib/guards/errorGuards";

import { usePayBookingApi } from "../api/usePayBookingApi";

export const usePayBooking = () => {
  const { payBooking } = usePayBookingApi();
  const payingId = ref<string | null>(null);
  const paidBookings = ref(new Set<string>());
  const processingLabel = ref<string>("Оплатить");

  const toast = useToast();

  const pay = async (bookingId: string) => {
    if (payingId.value === bookingId) return false;
    payingId.value = bookingId;
    processingLabel.value = "В обработке...";

    try {
      await payBooking(bookingId);
      paidBookings.value.add(bookingId);
      processingLabel.value = "Оплата прошла успешно!";
      return true;
    } catch (error) {
      const statusCode = getHttpStatusCode(error);
      const description =
        typeof statusCode === "number"
          ? statusCode === 410
            ? "Время оплаты истекло"
            : "Ошибка оплаты"
          : getErrorMessage(error);

      toast.add({
        title: "Не удалось оплатить билет",
        description,
        color: "error",
      });
      processingLabel.value = description;
      return false;
    } finally {
      payingId.value = null;
    }
  };

  const isPaying = (id: string) => computed(() => payingId.value === id);
  const isPaidOrPaying = (id: string) =>
    computed(() => payingId.value === id || paidBookings.value.has(id));

  return { pay, isPaying, isPaidOrPaying, processingLabel };
};
