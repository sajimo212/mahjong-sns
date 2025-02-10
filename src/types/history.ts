import { z } from "zod";
import { gamesSchema } from "./game";

export const historySchema = z.array(gamesSchema);
export type History = z.infer<typeof historySchema>;
