import styles from "./TaikyokuPage.module.css";
import { History, historySchema } from "@/types/history";
import { newestFirst } from "@/lib/utils";
import { env } from "@/env";
import { ModalMakeGame } from "./ModalMakeGame";
import { Player, Game } from "@/types/game";

const fetchHistory = async (): Promise<History> => {
  const res = await fetch(`${env.BASE_URL}/api/v1/history`);
  const parsed = await res.json().then(body => historySchema.safeParse(body));
  if (!parsed.success) throw parsed.error;

  const history = parsed.data;
  history.forEach(e => e.games.sort(({ date: a }, { date: b }) => newestFirst(a, b)));
  return history;
};

const taikyokuId = 0;

export default async function TaikyokuPage() {
  const history = await fetchHistory();
  const gameHistory: Game[] = history[taikyokuId].games;
  const players: Player[] = history[taikyokuId].players;

  return (
    <div className={styles.container}>
      <div className={styles.infoPanel}>
        <p>
          <strong>対局日: </strong>
          {gameHistory[0].date}
        </p>
        <p>
          <strong>ルール: </strong>
          Mリーグルール // ここは、gameHistoryから取りたい
        </p>
        <p>
          <strong>参加者: </strong>
          {players.length}
          人
        </p>
      </div>
      <ModalMakeGame players={players} />
      <div className={styles.rankingTable}>
        <h2>トータル成績</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>名前</th>
              <th>スコア</th>
              <th>半荘数</th>
              <th>平均順位</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.totalScore}</td>
                <td>{gameHistory.length}</td>
                <td>{player.averageRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.historyTable}>
        <h2>半荘ごとの成績</h2>
        {gameHistory.map((game, index) => (
          <div key={game.id} className={styles.gameRecord}>
            <h3>
              {gameHistory.length - index}
              {" "}
              :
              {" "}
              {game.date}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>順位</th>
                  <th>名前</th>
                  <th>スコア</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(game.score)
                  .sort((a, b) => b[1].score - a[1].score)
                  .map(([name, score], i) => (
                    <tr key={name}>
                      <td>{i + 1}</td>
                      <td>{name}</td>
                      <td>{score.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
