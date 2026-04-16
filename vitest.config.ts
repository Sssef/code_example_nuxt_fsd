import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineVitestProject } from "@nuxt/test-utils/config";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "#server": path.resolve(rootDir, "./server"),
      "#common": path.resolve(rootDir, "./common"),
    },
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["test/unit/*.{test,spec}.ts"],
          environment: "node",
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          include: ["test/nuxt/*.{test,spec}.ts"],
          environment: "nuxt",
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL(".", import.meta.url)),
              domEnvironment: "happy-dom",
            },
          },
        },
      }),
    ],
    coverage: {
      enabled: true,
      provider: "v8",
    },
  },
});
