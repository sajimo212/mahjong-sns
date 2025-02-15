import { NextRequest, NextResponse } from "next/server";

import { getPlayerHistoryMock } from "@/mocks/handlers/history";
import type { History } from "@/types/history";
import { delay } from "msw";

export type GetHistoryParams = never;
export type GetHistoryRequestBody = never;
export type GetHistoryResponseBody = History;

export const GET = async (request: NextRequest) => {
  const auth = request.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // @TODO: Implement: Get History from the database
  await delay();
  const history = getPlayerHistoryMock({ length: 5 });

  return NextResponse.json<GetHistoryResponseBody>(history);
};
