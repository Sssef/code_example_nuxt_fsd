import {
  getCookie,
  setCookie,
  deleteCookie,
  type EventHandlerRequest,
  createError,
  H3Event,
} from "h3";
import { seal, unseal, defaults } from "iron-webcrypto";

export type UserSession = {
  authToken: string;
  expiresAt: number; // в миллисекундах
};

const SESSION_COOKIE_NAME = "session";

function getSessionSecret(): string {
  const raw = useRuntimeConfig().sessionSecret;
  const secret = typeof raw === "string" ? raw.trim() : "";

  if (process.env.NODE_ENV === "test" && secret.length === 0) {
    // Для тестов используем отдельный ключ
    return "test-secret-test-secret-test-secret-test";
  }

  if (secret.length === 0) {
    throw createError({
      statusCode: 500,
      message: "SESSION_SECRET не установлен",
    });
  }

  if (secret.length < 32) {
    throw createError({
      statusCode: 500,
      message: "SESSION_SECRET должен быть не менее 32 символов",
      data: { length: secret.length },
    });
  }

  return secret;
}

function getCookieSecureFlag(): boolean {
  return process.env.NODE_ENV === "production";
}

export async function createSession(
  event: H3Event<EventHandlerRequest>,
  data: UserSession,
) {
  const sealed = await seal(data, getSessionSecret(), defaults);
  const ttlSeconds = Math.max(
    0,
    Math.floor((data.expiresAt - Date.now()) / 1000),
  );

  setCookie(event, SESSION_COOKIE_NAME, sealed, {
    httpOnly: true,
    secure: getCookieSecureFlag(),
    sameSite: "lax",
    path: "/",
    maxAge: ttlSeconds,
  });
}

export async function getUserSession(
  event: H3Event,
): Promise<UserSession | null> {
  const cookie = getCookie(event, SESSION_COOKIE_NAME);
  if (!cookie) return null;

  try {
    const session = (await unseal(
      cookie,
      getSessionSecret(),
      defaults,
    )) as UserSession;

    if (
      !session ||
      typeof session !== "object" ||
      typeof session.authToken !== "string" ||
      typeof session.expiresAt !== "number"
    ) {
      return null;
    }

    // Если протухла на клиенте: очищаем.
    if (Date.now() >= session.expiresAt) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function destroySession(event: H3Event) {
  deleteCookie(event, SESSION_COOKIE_NAME, { path: "/" });
}
