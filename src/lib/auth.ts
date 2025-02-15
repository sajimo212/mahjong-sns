import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebaseAdmin";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
      },
      async authorize(credentials) {
        console.log("🛠 authorize() に渡された credentials:", credentials);

        if (!credentials?.idToken) {
          console.error("❌ ID トークンが提供されていません");
          return null;
        }

        try {
          const decodedToken = await adminAuth.verifyIdToken(credentials.idToken);
          console.log("✅ Firebase トークン検証成功:", decodedToken);
          return { id: decodedToken.uid, email: decodedToken.email, name: decodedToken.name as string };
        } catch (error) {
          console.error("❌ Firebase トークン検証エラー:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user)
        session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const handler = NextAuth(authOptions);

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line
  interface Session {
    user: {
      /** The user's postal address. */
      id?: string | null;
    } & DefaultSession["user"];
  }

  // eslint-disable-next-line
  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
  }
}
