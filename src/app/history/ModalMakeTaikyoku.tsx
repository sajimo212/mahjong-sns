"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./HistoryPage.module.css";

type Taikyokutype = {
  type: string;
  uma: string;
  oka: string;
};

const taikyokuId = "123"; // または動的に生成

export const ModalMakeTaikyoku = () => {
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

  const router = useRouter();
  const handleSubmit = () => {
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
            <div>
              <div className="p-4">
                <label htmlFor="options" className="block text-sm font-medium">
                  ルール選択:
                </label>
                <select id="options" value={selectedValues.type} onChange={e => handleChange("type", e.target.value)}>
                  <option value="" disabled>ルール</option>
                  <option value="option1">四麻</option>
                  <option value="option2">三麻</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>ウマ: </label>
                <input type="text" value={selectedValues.uma} onChange={e => handleChange("uma", e.target.value)} />

              </div>
              <div className={styles.inputGroup}>
                <label>オカ: </label>
                <input type="number" value={selectedValues.oka} onChange={e => handleChange("oka", e.target.value)} />

              </div>
            </div>

            <button className={styles.submitButton} onClick={handleSubmit}>作成する</button>
            <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
          </div>
        </div>
      </dialog>
    </>
  );
};
