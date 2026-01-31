import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { getUserSchema, GetUserResponseBody } from "@/types/auth";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    // 🔹 Zodでのバリデーション
    const result = getUserSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { idToken } = result.data;

    // 🔹 FirebaseのIDトークン検証
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // 🔹 ユーザー情報取得
    const user = await adminAuth.getUser(decodedToken.uid);

    const responseBody: GetUserResponseBody = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };

    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error("❌ サーバーエラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
  }
};
