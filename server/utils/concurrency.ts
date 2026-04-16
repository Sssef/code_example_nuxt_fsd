import pLimit from "p-limit";

/**
 * Глобальный лимит параллельных upstream-запросов.
 * Можно вынести в runtimeConfig при необходимости.
 */
const DEFAULT_CONCURRENCY = 5;

/**
 * Возвращает функцию для выполнения задач с ограничением параллельности.
 */
export function createConcurrencyLimiter(concurrency = DEFAULT_CONCURRENCY) {
  return pLimit(concurrency);
}
