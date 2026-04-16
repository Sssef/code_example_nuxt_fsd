import { z } from "zod";

import { registrationSchema } from "#common/lib/validation";

export const registrationFormSchema = registrationSchema
  .extend({
    passwordConfirmation: z.string().nonempty("Подтвердите пароль"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Пароли должны совпадать",
  });

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
