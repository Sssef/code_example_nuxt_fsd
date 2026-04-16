import { readBody, createError, type H3Event } from "h3";

import type { ZodType, z } from "zod";

export async function validateBody<T extends ZodType>(
  event: H3Event,
  schema: T,
): Promise<z.infer<T>> {
  const body = await readBody(event);

  const result = schema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.issues[0]?.message ?? "Некорректное тело запроса",
    });
  }

  return result.data;
}
