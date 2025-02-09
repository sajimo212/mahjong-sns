import { NextRequest, NextResponse } from "next/server"

export const GET = async (_: NextRequest, { params }: {params: Promise<{gameId: string}>}) => {
   const gameId = await params;
   return NextResponse.json({id: gameId});
}
