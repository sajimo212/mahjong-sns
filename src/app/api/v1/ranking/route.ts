import { NextRequest, NextResponse } from "next/server";

import { getRankingMock } from "@/mocks/handlers/ranking";
import type { PublicUser } from "@/types/user";
import { delay } from "msw";

export type GetRankingParams = never;
export type GetRankingRequestBody = never;
export type GetRankingResponseBody = PublicUser[];

export const GET = async (request: NextRequest) => {
  const auth = request.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // @TODO: Implement: Get Ranking from the database
  await delay();
  const ranking = getRankingMock();

  return NextResponse.json<GetRankingResponseBody>(ranking);
};
