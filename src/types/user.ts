import { z } from "zod";

export const userSchema = z.object({
  // userId: z.string(), // 内部ユーザーID
  playerId: z.string(), // 表示用のID
  email: z.string().email(),
  // password: z.string(),
  displayName: z.string(),

  totalScore: z.number().optional(),
});
export type User = z.infer<typeof userSchema>;

export const publicUserSchema = userSchema.omit({ email: true }).required();
export type PublicUser = z.infer<typeof publicUserSchema>;
