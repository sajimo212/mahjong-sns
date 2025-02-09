"use client"

import styles from "./GamesPage.module.css";
import { useState } from "react";
import GamePage from "../game/page";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";


const history = [
    {
        date: "2001/02/12",
    },
    {
        date: "2001/02/13",
    },
    {
        date: "2001/02/14",
    },
    {
        date: "2001/02/15",
    },
]




export default function GamesPage() {
    const [showModal, setShowModal] = useState(false);
    const [playerNames, setPlayerNames] = useState(["", "", "", ""]);

    const handleChange = (index, event) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[index] = event.target.value;
        setPlayerNames(newPlayerNames);
    };

    const router = useRouter();
    const handleSubmit = () => {
        router.push(`/game?players=${encodeURIComponent(JSON.stringify(playerNames))}`);
    };
    
    return (
        <div className={styles.container}>
            <button className = {styles.mainButton} onClick={() => setShowModal(true)}>
                対局を作成する
            </button>
            <h2>対局一覧</h2>
            {history.map((game, index) => (
                <div key ={index}>
                    <Link href="/game">{game.date}</Link>
                </div>
            ))}
            {showModal && (
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
                                <div key={i}>
                                    {name}
                                </div>
                            ))}
                        
                        <button className={styles.submitButton} onClick={handleSubmit}>作成する</button>
                        <button className={styles.cancelButton} onClick={() => setShowModal(false)}>キャンセル</button>
                    </div>
                    
                </div>
                
            )}
        </div>
    )
}