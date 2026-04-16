import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { Config } from "tailwindcss";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  content: [
    resolve(__dirname, "./src/widgets/**/*.{vue,js,ts}"),
    resolve(__dirname, "./src/pages/**/*.{vue,js,ts}"),
    resolve(__dirname, "./src/shared/**/*.{vue,js,ts}"),
    resolve(__dirname, "./src/features/**/*.{vue,js,ts}"),
    resolve(__dirname, "./src/app/**/*.{vue,js,ts}"),
    resolve(__dirname, "./src/app/styles/**/*.{css,scss,sass}"),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
