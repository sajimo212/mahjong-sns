import Link from "next/link";
import { History } from "@/types/history";
import { newestFirst } from "@/lib/utils";

import { ModalMakeGames } from "./ModalMakeGames";
import styles from "./GamesPage.module.css";

const fetchHistory = async (): Promise<History> => {
    const res = await fetch(`${process.env.BASE_URL}/api/v1/history`);
    const history: History = await res.json();
    history.forEach(e => e.games.sort(({date: a}, {date: b}) => newestFirst(a, b)));
    return history;
}

export default async function GamesPage() {
    const history = await fetchHistory();

    return (
        <div className={styles.container}>
            <ModalMakeGames />
            <h2>対局一覧</h2>
            {history.map(({ id, games }) => (
                <div key ={id}>
                    <Link href="/game">{games[0]?.date ?? '未入力'}</Link>
                </div>
            ))}
        </div>
    )
}
