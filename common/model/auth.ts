import type { loginSchema, registrationSchema } from "#common/lib/validation";

import type z from "zod";

// Данные для отправки по API (запросы к backend)
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegistrationRequest = Pick<
  z.infer<typeof registrationSchema>,
  "username" | "password"
>;
