import type { Settings } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

import type { H3Event } from "h3";

/**
 * Запрос настроек приложения (время на оплату)
 * @returns Settings
 */
export const fetchSettings = (event: H3Event): Promise<Settings> => {
  return upstreamFetch(event, "/settings");
};
