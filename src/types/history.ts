import { z } from "zod";
import { gamesSchema } from "./game";

export const historySchema = z.array(gamesSchema, { required_error: "対局履歴が見つかりません" });
export type History = z.infer<typeof historySchema>;
