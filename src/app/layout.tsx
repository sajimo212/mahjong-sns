import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import { env } from "@/env";

if (env.USE_MOCK === "true") {
  console.log("== setup mock: msw ==");
  const { initMocks } = await import("@/mocks");
  initMocks();
  console.log("== setup mock: msw (done) ==");
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
