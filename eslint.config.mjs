import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

export default tseslint.config(
  { files: ["eslint.config.m(t|j)s", "*.ts?(x)"] },
  {
    ignores: ["**/.next/**", "**/node_modules/**", "public/**"],
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  stylistic.configs.customize({
    flat: true,
    braceStyle: "1tbs",
    quotes: "double",
    semi: true,
  }),
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    linterOptions: {
      reportUnusedInlineConfigs: "warn",
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/no-confusing-void-expression": ["error", {
        ignoreArrowShorthand: false,
        ignoreVoidOperator: true,
        ignoreVoidReturningFunctions: true,
      }],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],
      "@typescript-eslint/restrict-template-expressions": ["error", {
        allowNumber: true,
        allowAny: false,
        allowBoolean: false,
        allowNever: false,
        allowNullish: false,
        allowRegExp: false,
      }],
    },
  },
);
