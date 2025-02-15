"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";

export default function UserInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseServices.auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>ログイン中: {user.email}</p>
          <button onClick={() => signOut(firebaseServices.auth)}>ログアウト</button>
        </div>
      ) : (
        <p>ログインしていません</p>
      )}
    </div>
  );
}
