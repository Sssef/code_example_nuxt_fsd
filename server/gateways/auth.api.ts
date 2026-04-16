import type { LoginRequest, RegistrationRequest } from "#common/model";

import { upstreamFetch } from "#server/gateways/upstreamHttp";

import type { H3Event } from "h3";

type AuthResponse = {
  token: string;
};

export const loginUser = (
  event: H3Event,
  credentials: LoginRequest,
): Promise<AuthResponse> => {
  return upstreamFetch<AuthResponse>(event, "/login", {
    method: "POST",
    body: credentials,
  });
};

export const registerUser = (
  event: H3Event,
  credentials: RegistrationRequest,
): Promise<AuthResponse> => {
  return upstreamFetch<AuthResponse>(event, "/register", {
    method: "POST",
    body: credentials,
  });
};

export const validateAuthSession = async (
  event: H3Event,
  authToken: string,
): Promise<void> => {
  await upstreamFetch(event, "/me/bookings", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
