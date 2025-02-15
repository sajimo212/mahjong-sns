"use client";

import { useState } from "react";
import styles from "./UserPage.module.css";
import { delay } from "msw";
import { redirect } from "next/navigation";

const user = {
  name: "sajimoto",
  point: [[10, 100], [-10, 60]],
  rank: [[2, 1], [4, 1]],
  gameAmount: {
    sanma: 1041,
    yonma: 30140,
  },
};

export default function UserPage() {
  const status: string = "idle"; // eslint-disable-line @typescript-eslint/no-inferrable-types
  const isAuth: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types
  const [value, setValue] = useState("Myonma");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await delay();
    /** TODO: login */
    redirect("/game");
  };

  const calAve = (user, type, gameType) => {
    const getAverage = arr => arr.reduce((sum, val) => sum + val, 0) / arr.length;

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
                    {calAve(user, "point", "four")}
                  </p>
                  <p className={styles.info}>
                    Mリーグ四麻平均順位：
                    {calAve(user, "rank", "four")}
                  </p>
                </div>
              );
            } else if (value === "Msanma") {
              return (
                <div>
                  <p className={styles.info}>
                    Mリーグ三麻平均ポイント：
                    {calAve(user, "point", "three")}
                  </p>
                  <p className={styles.info}>
                    Mリーグ三麻平均順位：
                    {calAve(user, "rank", "three")}
                  </p>
                </div>
              );
            } else {
              return <div> デバッグエラー</div>;
            }
          })()}
        </div>
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
