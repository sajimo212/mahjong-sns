import Link from "next/link";
import { History, historySchema } from "@/types/history";
import { newestFirst } from "@/lib/utils";
import { env } from "@/env";
import { ModalMakeTaikyoku } from "./ModalMakeTaikyoku";
import styles from "./HistoryPage.module.css";

const fetchHistory = async (): Promise<History> => {
  const res = await fetch(`${env.BASE_URL}/api/v1/history`);

  const parsed = await res.json().then(body => historySchema.safeParse(body));
  if (!parsed.success) throw parsed.error;

  const history = parsed.data;
  history.forEach(e => e.games.sort(({ date: a }, { date: b }) => newestFirst(a, b)));
  return history;
};

export default async function GamesPage() {
  const history = await fetchHistory();
  return (
    <div className={styles.container}>
      <ModalMakeTaikyoku />
      <h2>対局一覧</h2>
      {history.map(({ id }) => (
        <div key={id}>
          <Link href={{ pathname: `/taikyoku/${id}` }}>
            {id || "未入力"}
          </Link>
        </div>
      ))}
      
    </div>
  );
}
