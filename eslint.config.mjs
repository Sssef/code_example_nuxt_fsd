import tsParser from "@typescript-eslint/parser";
import importX from "eslint-plugin-import-x";
import prettier from "eslint-plugin-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import vueParser from "vue-eslint-parser";

import withNuxt from "./.nuxt/eslint.config.mjs";

const tsParserOptions = {
  project: ["./tsconfig.json", "./server/tsconfig.json"],
  tsconfigRootDir: import.meta.dirname,
};

export default withNuxt(
  {
    ignores: [
      ".nuxt/**",
      ".output/**",
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "scripts/**",
      "*.cjs",
    ],
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: tsParserOptions,
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ...tsParserOptions,
        parser: tsParser,
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,mts,cts,vue}"],
    plugins: {
      "import-x": importX,
      "unused-imports": unusedImports,
      prettier: prettier,
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json", "./server/tsconfig.json"],
        },
        node: true,
      },
    },
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "sort-imports": "off",
      "prettier/prettier": "error",

      "import-x/no-duplicates": "error",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "type",
          ],
          pathGroups: [
            { pattern: "#common/**", group: "internal", position: "before" },
            { pattern: "@shared/**", group: "internal", position: "before" },
            { pattern: "@features/**", group: "internal", position: "before" },
            { pattern: "@widgets/**", group: "internal", position: "before" },
            { pattern: "@pages/**", group: "internal", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: ["#server", "#server/*"],
        },
      ],

      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "off",
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx,vue}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@features/**", "@widgets/**", "@pages/**"],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx,vue}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@widgets/**", "@pages/**"],
        },
      ],
    },
  },
  {
    files: ["src/widgets/**/*.{ts,tsx,vue}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@pages/**"],
        },
      ],
    },
  },
);
