import { gameHandlers } from "./game";
import { historyHandlers } from "./history";
import { rankingHandlers } from "./ranking";

export const handlers = [
  ...gameHandlers,
  ...historyHandlers,
  ...rankingHandlers,
];
