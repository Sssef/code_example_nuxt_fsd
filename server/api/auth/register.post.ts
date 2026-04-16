import { registrationSchema } from "#common/lib/validation";

import { register } from "#server/services/auth/register";
import { validateBody } from "#server/utils/validateBody";

export default defineEventHandler(async (event) => {
  const body = await validateBody(event, registrationSchema);
  return register(event, body);
});
