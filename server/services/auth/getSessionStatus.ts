import { validateAuthSession } from "#server/gateways/auth.api";
import { destroySession, getUserSession } from "#server/utils/auth/session";
import {
  getAuthValidationKey,
  getCachedAuthValidation,
  setCachedAuthValidation,
} from "#server/utils/auth/sessionValidationCache";

import type { H3Event } from "h3";

export const getSessionStatus = async (
  event: H3Event,
): Promise<{ isAuthenticated: boolean }> => {
  const session = await getUserSession(event);

  if (!session) {
    destroySession(event);
    return { isAuthenticated: false };
  }

  const key = getAuthValidationKey(session.authToken);
  const cached = getCachedAuthValidation(key);
  if (typeof cached === "boolean") {
    return { isAuthenticated: cached };
  }

  try {
    await validateAuthSession(event, session.authToken);
    setCachedAuthValidation(key, true);
    return { isAuthenticated: true };
  } catch (error: unknown) {
    const maybe = error as { statusCode?: unknown };
    if (maybe.statusCode === 401) {
      destroySession(event);
      setCachedAuthValidation(key, false);
      return { isAuthenticated: false };
    }

    throw error;
  }
};
