"use client";

import { useState } from "react";
import styles from "./UserPage.module.css";
import { delay } from "msw";
import { redirect } from "next/navigation";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const status: string = "idle"; // eslint-disable-line @typescript-eslint/no-inferrable-types
  const isAuth: boolean = false; // eslint-disable-line @typescript-eslint/no-inferrable-types

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await delay();
    /** TODO: login */
    redirect("/game");
  };

  if (status === "loading") {
    return <p className={styles.loading}>読み込み中...</p>;
  }

  if (!isAuth) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>ユーザー情報画面</h1>
      <p className={styles.info}>
        名前:
        {username}
      </p>
      {/* <button onClick={() => signOut()} className={styles.button}>
        ログアウト
      </button> */}
    </div>
  );
}
