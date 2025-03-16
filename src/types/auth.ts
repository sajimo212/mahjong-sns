import { z } from "zod";

export const getUserSchema = z.object({
  idToken: z.string().min(1, "IDトークンが必要です"),
});

export type GetUserRequestBody = z.infer<typeof getUserSchema>;

export type GetUserResponseBody = {
  uid: string;
  email: string | null;
  displayName: string | null;
};
