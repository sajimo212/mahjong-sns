import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// 環境変数を取得
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  throw new Error("❌ Firebase Service Account Key が設定されていません。");
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const serviceAccount = JSON.parse(serviceAccountKey);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        projectId: serviceAccount.project_id as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        clientEmail: serviceAccount.client_email as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        privateKey: (serviceAccount.private_key as string).replace(/\\n/g, "\n"), // 改行を適切に処理
      }),
    });
    console.log("🔥 Firebase Admin 初期化成功");
  } catch (error) {
    console.error("❌ Firebase Admin の初期化エラー:", error);
  }
}

export const adminAuth = getAuth();
