"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const loginWithEmail = async () => {
    setError("");
    try {
      // Firebaseでログイン
      const userCredential = await signInWithEmailAndPassword(firebaseServices.auth, email, password);
      const user = userCredential.user;
      console.log("✅ Firebase ログイン成功", user);

      // FirebaseのIDトークンを取得
      const idToken = await user.getIdToken();

      // next-auth の認証を行う
      const nextAuthResponse = await signIn("credentials", {
        idToken,
        redirect: false,
      });

      if (nextAuthResponse?.error) {
        throw new Error(nextAuthResponse.error);
      }

      console.log("✅ next-auth セッション作成成功");

      // ログイン後の遷移
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ ログインエラー:", error);
      setError("❌ ログインエラー: " + (error instanceof Error ? error.message : "不明なエラー"));
    }
  };

  return (
    <div>
      <h2>メールログイン</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={loginWithEmail}>ログイン</button>
    </div>
  );
}
