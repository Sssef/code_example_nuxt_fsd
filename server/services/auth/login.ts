import type { LoginRequest } from "#common/model";

import { loginUser } from "#server/gateways/auth.api";
import { createSession } from "#server/utils/auth/session";

import type { H3Event } from "h3";

export const login = async (
  event: H3Event,
  credentials: LoginRequest,
): Promise<{ ok: true }> => {
  const response = await loginUser(event, credentials);

  await createSession(event, {
    authToken: response.token,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });

  return { ok: true };
};
