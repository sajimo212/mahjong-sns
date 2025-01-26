"use client"; // クライアントコンポーネントとして宣言

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
