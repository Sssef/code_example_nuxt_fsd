import { fileURLToPath } from "node:url";

const isProduction = process.env.NODE_ENV === "production";

const defaultSessionSecret = isProduction
  ? process.env.SESSION_SECRET
  : "dev-secret-dev-secret-dev-secret-1234";

const defaultServerApiBaseUrl = isProduction
  ? process.env.API_BASE_URL
  : "http://localhost:3022";

const defaultPublicApiBaseUrl =
  process.env.NUXT_PUBLIC_API_BASE_URL ||
  process.env.API_BASE_URL ||
  "http://localhost:3022";

const defaultSiteUrl =
  process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/test-utils",
    "@nuxt/image",
    "@vueuse/nuxt",
    "nuxt-ssr-api-logger",
  ],
  eslint: {
    checker: true,
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      htmlAttrs: {
        class: "dark",
        lang: "en",
      },
    },
  },
  srcDir: "./src/app",
  serverDir: "server",
  dir: {
    pages: fileURLToPath(new URL("./src/app/pages", import.meta.url)),
    layouts: fileURLToPath(new URL("./src/app/layouts", import.meta.url)),
    middleware: fileURLToPath(new URL("./src/app/middleware", import.meta.url)),
  },
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
    "#common": fileURLToPath(new URL("./common", import.meta.url)),
    "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
    "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
    "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
    "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
  },
  nitro: {
    alias: {
      "#common": fileURLToPath(new URL("./common", import.meta.url)),
    },
  },
  hooks: {
    "prepare:types"({ tsConfig }) {
      const aliasesToRemoveFromAutocomplete = ["~~", "~~/*", "@@", "@@/*"];
      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig.compilerOptions?.paths[alias]) {
          delete tsConfig.compilerOptions.paths[alias];
        }
      }
    },
  },
  ssr: true,
  css: ["./src/app/styles/global.css"],
  icon: {
    clientBundle: {
      scan: false,
      icons: [
        "heroicons:ticket",
        "heroicons:home",
        "heroicons:user",
        "heroicons:film",
        "heroicons:calendar",
        "heroicons:eye",
        "heroicons:eye-slash",
        "heroicons:user-plus",
        "heroicons:arrow-left-on-rectangle",
        "heroicons:arrow-right-on-rectangle",
        "heroicons:building-office",
        "heroicons:exclamation-triangle",
      ],
    },
  },
  image: {
    domains: ["localhost", "backend"],
    quality: 70,
    format: ["webp", "avif"],
  },
  runtimeConfig: {
    sessionSecret: defaultSessionSecret,
    apiBaseUrl: defaultServerApiBaseUrl,
    public: {
      siteUrl: defaultSiteUrl,
      apiBaseUrl: defaultPublicApiBaseUrl,
    },
  },
});
