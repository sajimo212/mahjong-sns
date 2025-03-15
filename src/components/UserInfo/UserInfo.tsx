/*
"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseServices.auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user
        ? (
            <div>
              <p>
                ログイン中:
                {user.email}
              </p>
              <button onClick={() => signOut(firebaseServices.auth)}>ログアウト</button>
            </div>
          )
        : (
            <p>ログインしていません</p>
          )}
    </div>
  );
}
*/
"use client";

import { useAuth } from "@/context/AuthProvider";
import { signOut } from "firebase/auth";
import { firebaseServices } from "@/lib/firebase";

export default function UserInfo() {
  const { currentUser, loading } = useAuth();

  if (loading) return <p>確認中...</p>;

  return (
    <div>
      {currentUser
        ? (
            <div>
              <p>
                ログイン中:
                {currentUser.email}
              </p>
              <button onClick={() => signOut(firebaseServices.auth)}>
                ログアウト
              </button>
            </div>
          )
        : (
            <p>ログインしていません</p>
          )}
    </div>
  );
}
