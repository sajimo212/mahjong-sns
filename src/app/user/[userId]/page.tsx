"use client";

import { ChangeEvent, useState } from "react";
import styles from "../UserPage.module.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Legend, Colors, Tooltip, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

const user = {
  name: "sajimoto",
  point: [[10, 70, 10, -20, -31, 26], [-10, 60, 10, -31, -29, 58]],
  rank: [[2, 1, 2, 3, 4, 2], [4, 1, 2, 3, 2, 1]],
  date: [["2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01", "2021-06-01"], ["2022-01-01", "2022-02-01", "2022-03-01", "2022-04-01", "2022-05-01", "2022-06-01"]],
  players: ["uechi", "take", "kanta", "kuroki"],
};

export default function UserPage() {
  const status: string = "idle"; // eslint-disable-line @typescript-eslint/no-inferrable-types
  const isAuth: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types
  const [value, setValue] = useState("Myonma");
  // const router = useRouter();

  ChartJS.register(Legend, Colors, Tooltip, LineElement, PointElement, LinearScale, Title, CategoryScale);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  // const handlePlayerClick = (player) => {
  //   alert(`${player}がクリックされました`);
  // };

  type User = {
    point: number[][]; // ゲームのポイント
    rank: number[][]; // ゲームの順位
    date: string[][]; // 日付
    players: string[]; // プレイヤー名
  };

  const calAve = (user: User, type: "point" | "rank", gameType: "four" | "three" | "all"): number | { four: { point: number; rank: number }; three: { point: number; rank: number } } => {
    const getAverage = (arr: number[]) => arr.reduce((sum: number, val: number) => sum + val, 0) / arr.length;
    const fourPlayerAvg = getAverage(user.point[0]);
    const threePlayerAvg = getAverage(user.point[1]);
    const fourPlayerRankAvg = getAverage(user.rank[0]);
    const threePlayerRankAvg = getAverage(user.rank[1]);

    if (gameType === "four") {
      return type === "point" ? fourPlayerAvg : fourPlayerRankAvg;
    } else if (gameType === "three") {
      return type === "point" ? threePlayerAvg : threePlayerRankAvg;
    } else {
      return {
        four: { point: fourPlayerAvg, rank: fourPlayerRankAvg },
        three: { point: threePlayerAvg, rank: threePlayerRankAvg },
      };
    }
  };

  if (status === "loading") {
    return <p className={styles.loading}>読み込み中...</p>;
  }

  if (!isAuth) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
    return (
      <div>
        <div>
          <h1 className={styles.title}>ユーザー情報画面</h1>
          <p className={styles.info}>
            名前:
            {user.name}
            {/* {playername} */}
          </p>
        </div>
        <div>
          <select className={styles.ddmenu} onChange={handleChange}>
            <optgroup label="Mリーグルール">
              <option value="Myonma">四麻</option>
              <option value="Msanma">三麻</option>
            </optgroup>
          </select>
          {(() => {
            if (value === "Myonma") {
              return (
                <div>
                  <p className={styles.info}>
                    Mリーグ四麻合計ポイント：
                    {typeof calAve(user, "point", "four") === "number" ? (calAve(user, "point", "four") as number) : "N/A"}
                  </p>
                  <p className={styles.info}>
                    Mリーグ四麻平均順位：
                    {typeof calAve(user, "rank", "four") === "number" ? (calAve(user, "rank", "four") as number) : "N/A"}
                  </p>
                </div>
              );
            } else if (value === "Msanma") {
              return (
                <div>
                  <p className={styles.info}>
                    Mリーグ三麻平均ポイント：
                    {typeof calAve(user, "point", "three") === "number" ? (calAve(user, "point", "three") as number) : "N/A"}
                  </p>
                  <p className={styles.info}>
                    Mリーグ三麻平均順位：
                    {typeof calAve(user, "rank", "three") === "number" ? (calAve(user, "rank", "three") as number) : "N/A"}
                  </p>
                </div>
              );
            } else {
              return <div> デバッグエラー</div>;
            }
          })()}
        </div>
        <Line
          datasetIdKey="id"
          data={{
            labels: value === "Myonma" ? user.date[0] : user.date[1],
            datasets: [
              {
                label: value === "Myonma" ? "四麻ポイント" : "三麻ポイント",
                data: value === "Myonma" ? user.point[0] : user.point[1],
              },
              // {

              //   label: "",
              //   data: [3, 2, 1],
              // },
            ],
          }}
          options={{ scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "日付",
              },
            },
            y: {
              title: {
                display: true,
                text: "ポイント",
              },

            },
          },
          plugins: {
            // tooltip: {
            //   callbacks: {
            //     title: (context) => {
            //       const game = gameHistory[context[0].dataIndex];
            //       return formatDate(game.createdAt);
            //     },
            //     label: (context) => {
            //       const label = context.dataset.label ?? "";
            //       const player = players.find(player => player.name === label);
            //       if (context.parsed.y !== null) {
            //         const playerPoint = gameHistory[context.parsed.x]?.score.find(score => score.uuid === player?.uuid)?.point ?? 0;
            //         return `${label}: ${formatPoint(playerPoint)} (累積 ${formatPoint(context.parsed.y)})`;
            //       }
            //     },
            //   },
            // },
          } }}
        />
        <h1 className={styles.title}>
          {user.name}
          さんの友人一覧だよ
        </h1>
        {user.players.slice(0, 4).map((player, index) => (
          <p
            key={index}
            className={styles.playersinfo}
            // onClick={() => handlePlayerClick(player)}
          >
            名前:
            {" "}
            {player}
          </p>
        ))}

      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>ユーザー情報画面</h1>
      <p className={styles.info}>
        名前:
        {user.name}
      </p>
      {/* <button onClick={() => signOut()} className={styles.button}>
        ログアウト
      </button> */}
    </div>
  );
}

/* }
        <h1 className={styles.title}>ログイン</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            ログイン
          </button>
        </form>
        */
