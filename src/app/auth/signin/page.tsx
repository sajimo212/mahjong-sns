"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import styles from "./Signin.module.css";

export default function SignIn() {
  const [username, setUsername] = useState(""); // ユーザー名の状態
  const [password, setPassword] = useState(""); // パスワードの状態
  const [error, setError] = useState(""); // エラーメッセージの状態

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false, // 手動でリダイレクト管理
      username, // 入力されたユーザー名を送信
      password, // 入力されたパスワードを送信
    });

    if (result?.error) {
      setError("ログインに失敗しました。ユーザー名またはパスワードが無効です。");
    } else {
      window.location.href = "/game"; // ログイン成功後にリダイレクト
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>
          ログインする
        </button>
      </div>
    </div>
  );
}
