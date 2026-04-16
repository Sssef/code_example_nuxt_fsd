import { createHash } from "node:crypto";

type CacheEntry = { isAuthenticated: boolean; checkedAt: number };

// Используем короткие TTL: этот endpoint может вызываться при каждой навигации/обновлении
const POSITIVE_TTL_MS = 5_000;
const NEGATIVE_TTL_MS = 1_000;

const validationCache = new Map<string, CacheEntry>();

export const getAuthValidationKey = (authToken: string): string => {
  return createHash("sha256").update(authToken).digest("hex");
};

export const getCachedAuthValidation = (key: string): boolean | null => {
  const entry = validationCache.get(key);
  if (!entry) return null;

  const ttl = entry.isAuthenticated ? POSITIVE_TTL_MS : NEGATIVE_TTL_MS;
  if (Date.now() - entry.checkedAt <= ttl) return entry.isAuthenticated;

  validationCache.delete(key);
  return null;
};

export const setCachedAuthValidation = (
  key: string,
  isAuthenticated: boolean,
): void => {
  validationCache.set(key, { isAuthenticated, checkedAt: Date.now() });
};
