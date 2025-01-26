import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // ユーザー認証
        if (credentials?.username === "user" && credentials?.password === "password") {
          // 認証成功時に返すユーザー情報
          return { id: "19403", name: "さじもと", email: "user@example.com" };
        }
        return null; // 認証失敗時
      },
    }),
  ],
  pages: {
    signIn: "/user", // ユーザータブをカスタムサインインページに設定
  },
  callbacks: {
    // JWT トークンにユーザー情報を追加
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    // セッションオブジェクトにトークン情報を追加
    async session({ session, token }) {
      session.user.id = token.id; // ユーザーIDをセッションに追加
      session.user.name = token.name; // ユーザー名をセッションに追加
      session.user.email = token.email; // メールアドレスをセッションに追加
      return session;
    },
  },
  session: {
    strategy: "jwt", // セッション管理に JWT を使用
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


