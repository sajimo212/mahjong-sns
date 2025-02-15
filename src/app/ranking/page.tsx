import { env } from "@/env";
import styles from "./RankingPage.module.css";
import { PublicUser, publicUserSchema } from "@/types/user";
import { z } from "zod";

const fetchRanking = async (): Promise<PublicUser[]> => {
  const res = await fetch(`${env.BASE_URL}/api/v1/ranking`);

  const parsed = await res.json().then((body) => {
    console.log(body);
    return z.array(publicUserSchema).safeParse(body);
  });
  if (!parsed.success) throw parsed.error;

  const ranking = parsed.data;
  return ranking;
};

export default async function RankingPage() {
  const ranking = await fetchRanking();

  // totalScoreでソート
  const sortedRanking = ranking.sort((a, b) => b.totalScore - a.totalScore);

  // 順位を計算
  let currentRank = 1;
  let previousScore = sortedRanking[0]?.totalScore;
  const rankedUsers = sortedRanking.map((user, index) => {
    if (user.totalScore !== previousScore) {
      currentRank = index + 1;
      previousScore = user.totalScore;
    }
    return { ...user, rank: currentRank };
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ランキング！！</h1>
      <ol className={styles.rankingList}>
        {rankedUsers.map(({ displayName, totalScore, rank }, index) => {
          let rankClass = "";
          if (rank === 1) rankClass = styles.gold;
          else if (rank === 2) rankClass = styles.silver;
          else if (rank === 3) rankClass = styles.bronze;

          return (
            <li key={index} className={`${styles.rankingItem} ${rankClass}`}>
              <span className={`${styles.rank}`}>
                {rank}
                位
              </span>
              <span className={styles.name}>{displayName}</span>
              <span className={styles.score}>
                {totalScore}
                pts.
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
