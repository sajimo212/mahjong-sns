import SessionProvider from "./SessionProvider";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* SessionProvider をクライアントコンポーネントとしてラップ */}
        <SessionProvider>
          <Header />
          <Navigation />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
