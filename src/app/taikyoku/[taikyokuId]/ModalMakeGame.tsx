"use client";
import { useRef } from "react";
import { Player, Score, scoreSchema } from "@/types/game";
import styles from "./TaikyokuPage.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ModalMakeGame = ({ players }: { players: Player[] }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => dialogRef.current?.close();
  const openModal = () => dialogRef.current?.showModal();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(z.array(scoreSchema).min(3).max(4)),
    defaultValues: players.slice(0, 4).map(player => ({
      playerId: player.playerId,
      name: player.name,
      rank: 1,
      score: 0,
    } satisfies Score)),
  });

  // データベース更新するよう修正
  const onSubmit = () => {
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

            <form onSubmit={handleSubmit(onSubmit)}>
              {players.map((player, index) => (
                <div key={index} className={styles.inputGroup}>
                  <label>{player.name}</label>
                  <input
                    type="number"
                    {...register(`${index}.score` as const)}
                  />
                </div>
              ))}
              <button className={styles.submitButton} type="submit">作成する</button>
              <button className={styles.cancelButton} type="button" onClick={closeModal}>キャンセル</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
