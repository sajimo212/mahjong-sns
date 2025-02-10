import { getPlayerHistoryMock } from "@/mocks/handlers/history";
import { History } from "@/types/history";
import { NextRequest, NextResponse } from "next/server";

export type GetHistoryParams = {};
export type GetHistoryRequestBody = undefined;
export type GetHistoryResponseBody = History;

export const GET = async (request: NextRequest) => {
  const auth = request.headers.get('Authorization');
  if (!auth) {
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }

  const history = getPlayerHistoryMock({length: 5});

  return NextResponse.json<GetHistoryResponseBody>(history);
};
