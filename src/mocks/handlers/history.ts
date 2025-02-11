import { delay, http, HttpResponse } from 'msw';
import type { Game, Games, Player } from '@/types/game';
import type { History } from '@/types/history';
import { getGameMock } from './game';
import { GetHistoryParams, GetHistoryRequestBody, GetHistoryResponseBody } from '@/app/api/v1/history/route';
import { env } from '@/env';

const getParticipatedPlayersFromGameList = (games: Game[]): Player[] => {
   const players: Required<Player>[] = [];
   for (const {score: scores} of games) {
      for (const {playerId, name, score, rank} of scores) {
         const player = players.find(({ playerId: id }) => id === playerId);
         if (!player) {
            players.push({ playerId, name, totalScore: score, averageRank: rank });
         } else {
            player.totalScore += score;
            player.averageRank += rank;
         }
      }
   }
   for (const player of players) {
      const participatedGames = games.filter(({score}) =>
         score.some(({playerId}) => playerId === player.playerId));
      player.averageRank /= participatedGames.length;
   }

   return players;
}


const getGamesMock = ({gamesId, length}: {gamesId: string, length: number}): Games => {
   const games = Array.from(
      { length },
      (_, index) => getGameMock({ gameId: `${gamesId}-${index}` })
   );

   return {
     id: gamesId,
     games,
     players: getParticipatedPlayersFromGameList(games),
   };
}

export const getPlayerHistoryMock = ({length}: {length: number}): History => (
   Array.from(
      { length },
      (_, index) => getGamesMock({
         gamesId: `mock--${index}`,
         length: Math.random() < 0.5 ? 4 : 8
      })
   )
);

export const historyHandlers = [
  http.get<GetHistoryParams, GetHistoryRequestBody, GetHistoryResponseBody>(
    `${env.BASE_URL}/api/v1/history`,
    async () => {
      await delay();
      return HttpResponse.json(getPlayerHistoryMock({length: 10}));
    }
  ),
];
