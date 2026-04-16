import type { Cinema, Session } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

/**
 * Получает список всех кинотеатров
 * @returns Promise<Cinema[]>
 */
export async function fetchAllCinemas() {
  return upstreamFetch<Cinema[]>("/cinemas");
}

/**
 * Получает список сессий кинотеатра
 * @param cinemaId - ID кинотеатра
 * @returns Promise<Session[]>
 */
export async function fetchCinemaSessions(cinemaId: number) {
  return upstreamFetch<Session[]>(`/cinemas/${cinemaId}/sessions`);
}
