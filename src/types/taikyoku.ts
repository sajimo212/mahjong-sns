import { z } from "zod";

export const taikyokuSchema = z.object({
  type: z.union([z.literal("4ma"), z.literal("3ma")]),
  points: z.union([z.literal("250"), z.literal("300"), z.literal("350")]),
  oka: z.union([z.literal("250"), z.literal("300"), z.literal("350"), z.literal("400")]),
  uma: z.union([z.literal("5-10"), z.literal("10-20"), z.literal("10-30"), z.literal("20-30")]),
  weight: z.coerce.number().int().positive(),
});

export type Taikyoku = z.infer<typeof taikyokuSchema>;
