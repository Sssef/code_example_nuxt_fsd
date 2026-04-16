import { bookingsSchema } from "#common/lib/validation";

import { bookMovieSession } from "#server/services/movie-sessions/bookMovieSession";
import { requireAuth } from "#server/utils/auth/authGuard";
import { validateBody } from "#server/utils/validateBody";

/**
 * BFF endpoint для создания бронирования на сеанс фильма
 */
export default defineEventHandler(async (event): Promise<void> => {
  const movieSessionId = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(movieSessionId) || movieSessionId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Некорректный movieSessionId",
    });
  }

  // Сначала проверяем авторизацию:
  // избегаем парсинга body для неавторизованных пользователей.
  const session = await requireAuth(event);

  const body = await validateBody(event, bookingsSchema);

  if (!Array.isArray(body?.seats) || body.seats.length === 0) {
    throw createError({
      statusCode: 400,
      message: "Не переданы seats",
    });
  }

  await bookMovieSession(event, movieSessionId, body.seats, session);
});
