import { gameHandlers } from "./game";
import { historyHandlers } from "./history";

export const handlers = [
  ...gameHandlers,
  ...historyHandlers,
];
