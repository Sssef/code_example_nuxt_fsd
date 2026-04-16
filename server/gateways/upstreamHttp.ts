import { $fetch } from "ofetch";

import { destroySession } from "#server/utils/auth/session";
import { mapFetchError } from "#server/utils/errorMapper";

import type { H3Event } from "h3";

type UpstreamFetchOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | Record<string, unknown> | null;
  timeout?: number;
  retry?: number;
  query?: Record<string, string | number | boolean | null | undefined>;
  params?: Record<string, string | number | boolean | null | undefined>;
};

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_RETRY = 2;

export async function upstreamFetch<T = unknown>(
  pathOrEvent: string | H3Event,
  pathOrOptions?: string | UpstreamFetchOptions,
  maybeOptions?: UpstreamFetchOptions,
): Promise<T> {
  if (typeof pathOrEvent === "string") {
    const path = pathOrEvent;
    const options =
      (pathOrOptions as UpstreamFetchOptions | undefined) ?? undefined;
    return upstreamFetchInternal<T>(undefined, path, options);
  }
  return upstreamFetchInternal<T>(
    pathOrEvent,
    pathOrOptions as string,
    maybeOptions,
  );
}

async function upstreamFetchInternal<T = unknown>(
  event: H3Event | undefined,
  path: string,
  options?: UpstreamFetchOptions,
): Promise<T> {
  try {
    return await $fetch<T>(path, {
      baseURL: useRuntimeConfig().apiBaseUrl,
      timeout: DEFAULT_TIMEOUT,
      retry: DEFAULT_RETRY,
      ...options,
    });
  } catch (error: unknown) {
    const status = getStatus(error);
    if (event && status === 401) {
      destroySession(event);
    }
    throw mapFetchError(error, { fallbackMessage: "Сервер не отвечает" });
  }
}

function getStatus(error: unknown): number | null {
  if (typeof error !== "object" || error === null) return null;
  const err = error as Record<string, unknown>;
  if (typeof err.status === "number") return err.status;
  if (typeof err.statusCode === "number") return err.statusCode;
  return null;
}
