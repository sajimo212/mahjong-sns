"use client"
import styles from "./RankingPage.module.css";
import { getDoc, doc } from "firebase/firestore";
import { firebaseServices } from "@/lib/firebase";

const docRef = doc(firebaseServices.db, "kanta", "BZyM3B2cnEL8AI613R7K");
const docSnap = await getDoc(docRef);
const data = docSnap.data(); 


export default function RankingPage() {
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.take}</h1>
      <button className={styles.button}>対局を作成する</button>
      <p className={styles.info}>まだ対局結果がありません。</p>
    </div>
  );
}
