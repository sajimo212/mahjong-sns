"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      // callbackUrl: "/game", // ログイン成功後のリダイレクト先
    });
  };

  if (status === "loading") {
    return <p className={styles.loading}>読み込み中...</p>;
  }

  if (!session) {
    return (
      <div>
        <h1 className={styles.title}>ログイン</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

  // セッションからユーザー情報を取得
  const { id, name, email } = session.user;

  return (
    <div>
      <h1 className={styles.title}>ユーザー情報画面</h1>
      <p className={styles.info}>ユーザーID: {id}</p>
      <p className={styles.info}>名前: {name}</p>
      <p className={styles.info}>メールアドレス: {email}</p>
      <button onClick={() => signOut()} className={styles.button}>
        ログアウト
      </button>
    </div>
  );
}
