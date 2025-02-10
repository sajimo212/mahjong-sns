'use client'
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './GamesPage.module.css';

export const ModalMakeGames = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeModal = () => dialogRef.current?.close();
  const openModal = () => dialogRef.current?.showModal();

  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = event.target.value;
    setPlayerNames(newPlayerNames);
  };

  const router = useRouter();
  const handleSubmit = () => {
    router.push(`/game?players=${encodeURIComponent(JSON.stringify(playerNames))}`);
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
            <div>
              {playerNames.map((name, i) => (
                <div key={i} className={styles.inputGroup}>
                  <label>プレイヤー{i + 1}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => handleChange(i, event)}
                  />
                </div>
              ))}
            </div>

            {playerNames.map((name, i) => (
              <div key={i}>{name}</div>
            ))}

            <button className={styles.submitButton} onClick={handleSubmit}>作成する</button>
            <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
