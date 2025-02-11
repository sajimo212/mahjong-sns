import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.string().url(),
    VERCEL: z.literal("1").optional(),
    VERCEL_URL: z.string().url().optional(),
    USE_MOCK: z.union([z.literal('true'), z.literal('false')]).optional(),
  },
  // client: {
  //   NEXT_PUBLIC_USE_MOCK: z.literal("true").optional(),
  // },
  runtimeEnv: {
    BASE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    USE_MOCK: process.env.USE_MOCK,
  },
  // experimental__runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
