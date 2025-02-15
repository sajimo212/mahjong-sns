import { delay, http, HttpResponse } from "msw";
import type { PublicUser } from "@/types/user";
import type { GetRankingParams, GetRankingRequestBody, GetRankingResponseBody } from "@/app/api/v1/ranking/route";
import { env } from "@/env";

export const getRankingMock = (): PublicUser[] => (
  [
    { playerId: "sajimoto", displayName: "さじもと", totalScore: -100.0 },
    { playerId: "kan-chan", displayName: "かんちゃん", totalScore: 400.5 },
    { playerId: "uenchi-san", displayName: "上地さん", totalScore: -100.0 },
    { playerId: "mukaida", displayName: "偉紀", totalScore: 0.0 },
    { playerId: "yasuda", displayName: "やすだ", totalScore: -200.5 },
  ]
);

export const rankingHandlers = [
  http.get<GetRankingParams, GetRankingRequestBody, GetRankingResponseBody>(
    `${env.BASE_URL}/api/v1/ranking`,
    async () => {
      await delay();
      return HttpResponse.json(getRankingMock());
    },
  ),
];
