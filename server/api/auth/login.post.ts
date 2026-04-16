import { loginSchema } from "#common/lib/validation";

import { login } from "#server/services/auth/login";
import { validateBody } from "#server/utils/validateBody";

export default defineEventHandler(async (event) => {
  const body = await validateBody(event, loginSchema);
  return login(event, body);
});
