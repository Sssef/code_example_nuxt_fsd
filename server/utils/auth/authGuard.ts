import { type H3Event, createError } from "h3";

import {
  destroySession,
  getUserSession,
  type UserSession,
} from "#server/utils/auth/session";

export async function requireAuth(event: H3Event): Promise<UserSession> {
  const session = await getUserSession(event);

  if (!session) {
    destroySession(event);
    throw createError({
      statusCode: 401,
      message: "Неавторизован",
    });
  }

  return session;
}
