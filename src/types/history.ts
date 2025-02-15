import { z } from "zod";
import { taikyokuSchema } from "./game";

export const historySchema = z.array(taikyokuSchema, { required_error: "対局履歴が見つかりません" });
export type History = z.infer<typeof historySchema>;
