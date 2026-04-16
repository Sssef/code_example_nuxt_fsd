import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

import { requireAuth } from "@shared/auth";
import { routes } from "@shared/routes";

export default defineNuxtRouteMiddleware(async () => {
  const isAuth = await requireAuth();

  if (!isAuth) {
    return navigateTo(routes.auth.login());
  }
});
