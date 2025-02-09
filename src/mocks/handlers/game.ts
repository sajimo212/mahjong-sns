import { delay, http, HttpResponse } from 'msw';

type Game = {
  id: string;
  score: { [name: string]: number };
  date: string;
}

type GetGameParams = { gameId: string };
type GetGameRequestBody = GetGameParams;
type GetGameResponseBody = Game;

const getGameMock = ({gameId}: GetGameParams): Game => ({
  id: gameId,
  score: {
    "さじもと": 0.0,
    "向田偉紀": 0.0,
    "黒木": 0.0,
    "安田": 0.0,
  },
  date: new Date().toLocaleString(),
});

export const gameHandlers = [
  http.get<GetGameParams, GetGameRequestBody, GetGameResponseBody>(
    `${process.env.API_URL}/api/v1/game/:gameId`,
    async ({params}) => {
      await delay();

      return HttpResponse.json(getGameMock(params));
    }
  ),
];
