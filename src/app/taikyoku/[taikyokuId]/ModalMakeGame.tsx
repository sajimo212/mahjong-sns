"use client";
import { useRef } from "react";
import { Player } from "@/types/game";
import styles from "./TaikyokuPage.module.css";

export const ModalMakeGame = ({ players }: { players: Player[] }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => dialogRef.current?.close();
  const openModal = () => dialogRef.current?.showModal();

  // データベース更新するよう修正
  const handleSubmit = () => {
    closeModal();
  };

  return (
    <>
      <button className={styles.mainButton} onClick={openModal}>
        成績を入力する
      </button>

      <dialog ref={dialogRef}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>成績を入力する</h3>
            {players.map((player, index) => (
              <div key={index} className={styles.inputGroup}>
                <label>{player.name}</label>
                <input
                  type="number"

                />
              </div>
            ))}
            <button className={styles.submitButton} onClick={handleSubmit}>作成する</button>
            <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
          </div>
        </div>
      </dialog>
    </>
  );
};
