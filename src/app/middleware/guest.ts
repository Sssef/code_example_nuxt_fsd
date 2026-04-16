import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

import { requireGuest } from "@shared/auth";
import { routes } from "@shared/routes";

export default defineNuxtRouteMiddleware(async () => {
  const isGuest = await requireGuest();

  if (!isGuest) {
    return navigateTo(routes.myTickets());
  }
});
