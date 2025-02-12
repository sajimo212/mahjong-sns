import styles from "./TaikyokuPage.module.css";
import { useSearchParams, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { History, historySchema } from "@/types/history";
import { newestFirst } from "@/lib/utils";
import { env } from "@/env";
import { ModalMakeGame } from "./ModalMakeGame";

type Taikyokutype = {
  type: string;
  uma: string;
  oka: string;
};

type SearchParams = Promise<{
  rules?: Taikyokutype;
}>;

const fetchHistory = async (): Promise<History> => {
  const res = await fetch(`${env.BASE_URL}/api/v1/history`);

  const parsed = await res.json().then(body => historySchema.safeParse(body));
  if (!parsed.success) throw parsed.error;

  const history = parsed.data;
  history.forEach(e => e.games.sort(({ date: a }, { date: b }) => newestFirst(a, b)));
  return history;
};

const taikyokuId = 0;

export default async function TaikyokuPage({ searchParams }: { searchParams: SearchParams }) {
  const history = await fetchHistory();
  const results = history[taikyokuId].games[0].score;
  const gameHistory = history[taikyokuId].games;
  const players = history[taikyokuId].players;

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
          4人  // ここもgameHistoryから取りたい
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

      {
      /*
      showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>成績入力</h3>
            {results.map((player, index) => (
              <div key={index} className={styles.inputGroup}>
                <label>{player.name}</label>
                <input
                  type="number"
                  onChange={e => handleInputChange(player.name, e.target.value)}
                />
              </div>
            ))}
            <button className={styles.submitButton} onClick={handleSubmit}>入力する</button>
            <button className={styles.cancelButton} onClick={() => setShowModal(false)}>キャンセル</button>
          </div>
        </div>
      )
      */
      }

    </div>
  );

  /*
  const [results, setResults] = useState<Results>(JSON.parse(players??"null")?.map((player: string) => ({
    name: player,
    score: 0.0,
    rounds: 0,
    avg: 0.0,
  })) ?? []);

  const [inputScores, setInputScores] = useState<Record<string, number>>({});
  const [gameHistory, setGameHistory] = useState<GameHistory>([]);

  const handleInputChange = (name: string, value: string) => {
    setInputScores({ ...inputScores, [name]: parseFloat(value) || 0 });
  };

  const handleSubmit = () => {
    let updatedResults = results.map(player => ({
      ...player,
      score: player.score + (inputScores[player.name] || 0),
      rounds: player.rounds + 1,
    }));

    updatedResults.sort((a, b) => b.score - a.score);

    // 平均順位の計算
    const updatedGameHistory = [{ id: gameHistory.length + 1, date: new Date().toLocaleString(), scores: { ...inputScores } }, ...gameHistory];

    updatedResults = updatedResults.map((player) => {
      let totalRank = 0;
      let gamesPlayed = 0;

      updatedGameHistory.forEach((game) => {
        const sortedScores = Object.entries(game.scores).sort(([, a], [, b]) => b - a);
        const rank = sortedScores.findIndex(([name]) => name === player.name) + 1;
        if (rank > 0) {
          totalRank += rank;
          gamesPlayed++;
        }
      });

      return {
        ...player,
        avg: gamesPlayed > 0 ? totalRank / gamesPlayed : 0.0,
      };
    });

    setResults(updatedResults);
    setGameHistory(updatedGameHistory);
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoPanel}>
        <p>
          <strong>対局名: </strong>
          麻雀 2025/01/13
        </p>
        <p>
          <strong>ルール: </strong>
          Mリーグルール
        </p>
        <p>
          <strong>参加者: </strong>
          4人
        </p>
      </div>
      <button className={styles.mainButton} onClick={() => setShowModal(true)}>
        成績を入力する
      </button>
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
            {results.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.rounds}</td>
                <td>{player.avg.toFixed(2)}</td>
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
                {Object.entries(game.scores)
                  .sort(([, a], [, b]) => b - a)
                  .map(([name, score], i) => (
                    <tr key={name}>
                      <td>{i + 1}</td>
                      <td>{name}</td>
                      <td>{score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>成績入力</h3>
            {results.map((player, index) => (
              <div key={index} className={styles.inputGroup}>
                <label>{player.name}</label>
                <input
                  type="number"
                  onChange={e => handleInputChange(player.name, e.target.value)}
                />
              </div>
            ))}
            <button className={styles.submitButton} onClick={handleSubmit}>入力する</button>
            <button className={styles.cancelButton} onClick={() => setShowModal(false)}>キャンセル</button>
          </div>
        </div>
      )}
    </div>
  );
  */
}
