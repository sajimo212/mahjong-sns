import type { Game } from "@/types/game";
import styles from "./ScorePage.module.css";

const fetchGame = async ({ gameId }: { gameId: string }): Promise<Game> => {
  const res = await fetch(`${process.env.BASE_URL}/api/v1/game/${gameId}`);
  const game = await res.json();
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
                {name}: {score as number}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  );
}
