import styles from "./RankingPage.module.css";

export default function RankingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>対局一覧！！</h1>
      <button className={styles.button}>対局を作成する</button>
      <p className={styles.info}>まだ対局結果がありません。</p>
    </div>
  );
}
