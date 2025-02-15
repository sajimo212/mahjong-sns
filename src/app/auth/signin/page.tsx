"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import styles from "./Signin.module.css";
import { env } from "@/env";

export default function SignIn() {
  const [username, setUsername] = useState(""); // ユーザー名の状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const [error, setError] = useState(""); // エラーメッセージの状態

  const handleLogin = async () => {
    const res = await fetch(`${env.BASE_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.status !== 200) {
      setError("ログインに失敗しました。ユーザー名またはパスワードが無効です。");
    } else {
      redirect("/game"); // ログイン成功後にリダイレクト
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form action={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          ログインする
        </button>
      </form>
    </div>
  );
}
