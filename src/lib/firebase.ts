import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 環境変数の取得（undefined の場合エラー）
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 必須変数が不足していないか確認
const missingKeys = Object.keys(firebaseConfig)
  .filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]); // 空文字や undefined を検出

if (missingKeys.length > 0) {
  console.error(" Firebase の設定が不足しています:", missingKeys);
  throw new Error("Firebaseの設定が不完全です。");
}

// 初期化（すでにアプリが存在する場合は再初期化しない）
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firebaseServices = {
  db: getFirestore(app),
  auth: getAuth(app),
  storage: getStorage(app),
};

console.log("🔥 Firebase 初期化成功");
