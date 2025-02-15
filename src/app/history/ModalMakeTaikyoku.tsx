"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./HistoryPage.module.css";
import { type Taikyoku, taikyokuSchema } from "@/types/taikyoku";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const taikyokuId = "123"; // または動的に生成

export const ModalMakeTaikyoku = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => dialogRef.current?.close();
  const openModal = () => dialogRef.current?.showModal();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(taikyokuSchema),
    defaultValues: {
      type: "4ma",
      uma: "10-30",
      oka: "300",
      points: "250",
      weight: 0,
    } satisfies Taikyoku,
  });

  const router = useRouter();
  const onSubmit = () => {
    // @TODO: ここで対局を作成する処理を書く
    router.push(`/taikyoku/${taikyokuId}`);
  };

  return (
    <>
      <button className={styles.mainButton} onClick={openModal}>
        対局を作成する
      </button>

      <dialog ref={dialogRef}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>対局を作成する</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label htmlFor="options" className="block text-sm font-medium">
                  ルール選択:
                </label>
                <select {...register("type")}>
                  <option value="4ma">四麻</option>
                  <option value="3ma">三麻</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>ウマ: </label>
                <select {...register("uma")}>
                  <option value="5-10">5-10</option>
                  <option value="10-20">10-20</option>
                  <option value="10-30">10-30</option>
                  <option value="20-30">20-30</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>持ち点: </label>
                <select {...register("points")}>
                  <option value="250">25,000点持ち</option>
                  <option value="300">30,000点持ち</option>
                  <option value="350">35,000点持ち</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>オカ: </label>
                <select {...register("oka")}>
                  <option value="250">25,000点返し</option>
                  <option value="300">30,000点返し</option>
                  <option value="350">35,000点返し</option>
                  <option value="400">40,000点返し</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>ランキングに反映する重み: </label>
                <input type="number" min="0" {...register("weight")} />
              </div>

              <button className={styles.submitButton} type="submit">作成する</button>
              <button className={styles.cancelButton} type="button" onClick={closeModal}>キャンセル</button>
            </form>

          </div>
        </div>
      </dialog>
    </>
  );
};
