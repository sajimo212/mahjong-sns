import { delay, http, HttpResponse } from 'msw';
import type { Game } from '@/types/game';
import type { GetGameParams, GetGameRequestBody, GetGameResponseBody } from '@/app/api/v1/game/[gameId]/route';

export const getGameMock = ({ gameId }: GetGameParams): Game => ({
  id: gameId,
  score: [
    { playerId: 'sajimoto', name: "さじもと", score: 0.0, rank: 1 },
    { playerId: 'take', name: "向田偉紀", score: 0.0, rank: 1 },
    { playerId: 'kuroki', name: "黒木", score: 0.0, rank: 1 },
    { playerId: 'yasuda', name: "安田", score: 0.0, rank: 1 },
  ],
  date: '2024-08-02T12:50:00+09:00:00',
});

export const gameHandlers = [
  http.get<GetGameParams, GetGameRequestBody, GetGameResponseBody>(
    `${process.env.BASE_URL}/api/v1/game/:gameId`,
    async ({ params: { gameId } }) => {
      await delay();
      return HttpResponse.json(getGameMock({ gameId: `mock--${gameId}` }));
    }
  ),
];
