"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signUp = async () => {
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("パスワードは6文字以上にしてください。");
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseServices.auth, email, password);
      setSuccess("✅ ユーザー登録成功！");
      console.log("✅ ユーザー登録成功:", userCredential.user);
    } catch (error) {
      setError("❌ ユーザー登録エラー: " + error.message);
    }
  };

  return (
    <div>
      <h2>ユーザー登録</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="email"
        placeholder="メールアドレス"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード（6文字以上）"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>登録</button>
    </div>
  );
}
