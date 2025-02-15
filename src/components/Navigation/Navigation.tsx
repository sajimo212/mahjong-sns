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
<<<<<<< HEAD
        href="/score"
        className={`${styles.tab} ${pathname === "/score" ? styles.active : ""}`}
      >
        ランキング
      </Link>
      <Link
        href={{ pathname: "/taikyoku" }}
=======
        href={{ pathname: "/ranking" }}
>>>>>>> develop
        className={`${styles.tab} ${pathname === "/ranking" ? styles.active : ""}`}
      >
        募集
      </Link>
      <Link
        href="/score"
        className={`${styles.tab} ${pathname === "/score" ? styles.active : ""}`}
      >
        募集
      </Link>
    </nav>
  );
}
