"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        href="/history"
        className={`${styles.tab} ${pathname === "/history" ? styles.active : ""}`}
      >
        対局
      </Link>
      <Link
        href="/user"
        className={`${styles.tab} ${pathname === "/user" ? styles.active : ""}`}
      >
        ユーザー
      </Link>
      <Link
        href="/score"
        className={`${styles.tab} ${pathname === "/score" ? styles.active : ""}`}
      >
        成績
      </Link>
      <Link
        href="/taikyoku"
        className={`${styles.tab} ${pathname === "/ranking" ? styles.active : ""}`}
      >
        ランキング
      </Link>
    </nav>
  );
}
