import { z } from "zod";
import { zPastISO8601 } from "./util";

export const playerSchema = z.object({
   playerId: z.string(),
   name: z.string(), // そのときの名前
   totalScore: z.number().optional(),
   averageRank: z.number().optional(),
});

export const scoreSchema = z.object({
   playerId: z.string(),
   name: z.string(),
   rank: z.number().int().min(1).max(4),
   score: z.number(),
});

export const gameSchema = z.object({
   id: z.string(),
   score: z.array(scoreSchema).min(3).max(4),
   date: zPastISO8601,
});

export const gamesSchema = z.object({
   id: z.string(),
   games: z.array(gameSchema, { required_error: "対局が見つかりません" }),
   players: z.array(playerSchema, { required_error: "対局のプレイヤーが見つかりません" }),
});

export type Player = z.infer<typeof playerSchema>;
export type Score = z.infer<typeof scoreSchema>;
export type Game = z.infer<typeof gameSchema>;
export type Games = z.infer<typeof gamesSchema>;
