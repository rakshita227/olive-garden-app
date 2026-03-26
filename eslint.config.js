import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Functions called via HTML onclick attributes appear "unused" to ESLint.
      // Only flag variables that are unused within their local (non-global) scope.
      "no-unused-vars": ["error", { "vars": "local" }],
    },
  },
];
