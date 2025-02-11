import { gameSchema, type Game } from "@/types/game";
import styles from "./ScorePage.module.css";
import { env } from "@/env";

const fetchGame = async ({ gameId }: { gameId: string }): Promise<Game> => {
  const res = await fetch(`${env.BASE_URL}/api/v1/game/${gameId}`);

  const parsed = await res.json().then(body => gameSchema.safeParse(body));
  if (!parsed.success) throw parsed.error;
  
  const game = parsed.data;
  return game;
}

export default async function ScorePage() {
  const game = await fetchGame({ gameId: "game-mock-id" });

  return (
    <div className={styles.container}>  
      <h1 className={styles.title}>対局一覧！！</h1>
      <button className={styles.button}>対局を作成する</button>
      <p className={styles.info}>まだ対局結果がありません。</p>
      <dl>
        <dt>対局ID</dt>
        <dd>{game.id}</dd>
        <dt>日付</dt>
        <dd>{game.date}</dd>
        <dt>スコア</dt>
        <dd>
          <ul>
            {game.score.map(({ playerId, name, score }) => (
              <li key={playerId}>
                {name}: {score}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  );
}
