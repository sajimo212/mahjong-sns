"use client";

import styles from "./Navigation.module.css";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <a
        href="/games"
        className={`${styles.tab} ${pathname === "/games" ? styles.active : ""}`}
      >
        対局
      </a>
      <a
        href="/user"
        className={`${styles.tab} ${pathname === "/user" ? styles.active : ""}`}
      >
        ユーザー
      </a>
      <a
        href="/score"
        className={`${styles.tab} ${pathname === "/score" ? styles.active : ""}`}
      >
        成績
      </a>
      <a
        href="/game"
        className={`${styles.tab} ${pathname === "/ranking" ? styles.active : ""}`}
      >
        ランキング
      </a>
    </nav>
  );
}
