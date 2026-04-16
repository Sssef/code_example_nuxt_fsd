import { destroySession } from "#server/utils/auth/session";

import type { H3Event } from "h3";

export const logout = (event: H3Event): { ok: true } => {
  destroySession(event);
  return { ok: true };
};
