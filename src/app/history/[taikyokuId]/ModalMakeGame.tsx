"use client";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@/types/game";

import styles from "./TaikyokuPage.module.css";

type Taikyokutype = {
  type: string;
  uma: string;
  oka: string;
};

export const ModalMakeGame = ({ players }: Player[]) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => dialogRef.current?.close();
  const openModal = () => dialogRef.current?.showModal();

  const [selectedValues, setSelectedValues] = useState<Taikyokutype>({
    type: "option1",
    uma: "",
    oka: "",
  });

  const handleChange = (field: keyof Taikyokutype, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);

  const router = useRouter();
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
                  onChange={e => handleSubmit()}
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
