const DEFAULT_LOCALE = "ru-RU";
const DEFAULT_TIME_ZONE = "UTC";

/**
 * Форматирует общее количество минут в строку формата "Xч Yм"
 * @example formatDuration(125) -> "2ч 5м"
 */
export function formatDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0 && minutes === 0) return "0";
  if (hours > 0 && minutes === 0) return `${hours}ч`;
  if (hours === 0 && minutes > 0) return `${minutes}м`;

  return `${hours}ч ${minutes}м`;
}

type DateInput = string | number | Date;

/**
 * Форматирует дату в формат "ДД.ММ"
 * @example formatShortDate("2025-04-02") -> "02.04"
 */
export function formatShortDate(value: DateInput) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    day: "2-digit",
    month: "2-digit",
    timeZone: DEFAULT_TIME_ZONE,
  }).format(new Date(value));
}

/**
 * Форматирует время в формат "ЧЧ:ММ"
 * @example formatShortTime("2025-04-02T14:30:00Z") -> "14:30"
 */
export function formatShortTime(value: DateInput) {
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: DEFAULT_TIME_ZONE,
  }).format(new Date(value));
}
