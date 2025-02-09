import styles from "./ScorePage.module.css";

const fetchGame = async ({ id }: { id: string }) => {
  const res = await fetch(`${process.env.API_URL}/api/v1/game/${id}`);
  const game = await res.json();
  return game;
}

export default async function ScorePage() {
  const game = await fetchGame({ id: "game-mock-id" });

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
            {Object.entries(game.score).map(([name, score]) => (
              <li key={name}>
                {name}: {score as number}
              </li>
            ))}
          </ul>
        </dd>
      </dl>
    </div>
  );
}
