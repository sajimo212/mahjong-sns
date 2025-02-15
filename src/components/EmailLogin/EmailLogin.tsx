"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginWithEmail = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(firebaseServices.auth, email, password);
      console.log("✅ ログイン成功");
      router.push("/dashboard"); // ログイン後、ダッシュボードへ遷移
    } catch (error) {
      const message = typeof error === "string" ? error : error instanceof Error ? error.message : "";
      setError("❌ ログインエラー: " + message);
    }
  };

  return (
    <div>
      <h2>メールログイン</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="メールアドレス"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={loginWithEmail}>ログイン</button>
    </div>
  );
}
