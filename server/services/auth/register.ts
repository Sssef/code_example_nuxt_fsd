import type { RegistrationRequest } from "#common/model";

import { registerUser } from "#server/gateways/auth.api";
import { createSession } from "#server/utils/auth/session";

import type { H3Event } from "h3";

export const register = async (
  event: H3Event,
  credentials: RegistrationRequest,
): Promise<{ ok: true }> => {
  const response = await registerUser(event, credentials);

  await createSession(event, {
    authToken: response.token,
    expiresAt: Date.now() + 60 * 60 * 1000,
  });

  return { ok: true };
};
