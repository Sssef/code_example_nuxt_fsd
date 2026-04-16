import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .nonempty("Введите имя пользователя")
    .min(8, "Имя пользователя должно содержать минимум 8 символов")
    .max(50),

  password: z
    .string()
    .trim()
    .nonempty("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать минимум 1 заглавную букву")
    .regex(/\d/, "Пароль должен содержать минимум 1 цифру"),
});

export const registrationSchema = loginSchema;
