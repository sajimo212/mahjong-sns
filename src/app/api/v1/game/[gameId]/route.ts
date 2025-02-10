import { NextRequest, NextResponse } from "next/server"
import type { Game } from "@/types/game"
import { getGameMock } from "@/mocks/handlers/game";

export type GetGameParams = { gameId: string };
export type GetGameRequestBody = undefined;
export type GetGameResponseBody = Game;

export async function GET(_: NextRequest, { params }: {params: Promise<GetGameParams>}) {
   const { gameId } = await params;

   // @TODO: Implement: Get Game by ID from the database
   const game = getGameMock({ gameId });

   return NextResponse.json<GetGameResponseBody>(game);
}
