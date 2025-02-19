import React, { useContext } from 'react';
import { ThemeContext } from '../../hooks/ThemeContext.jsx'; // Yol doğru olmalı
import { IoMdSunny } from "react-icons/io";
import { FaPalette, FaMoon } from "react-icons/fa";
import styles from './ThemeSelector.module.css'; 

function ThemeSelector() {
    const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

    return (
        <div className={styles.themeSelector}>
            <button onClick={() => setCurrentTheme('dark')} className={styles.themeButton}>
                <FaMoon className={styles.themeIcon} /> Dark
            </button>
            <button onClick={() => setCurrentTheme('light')} className={styles.themeButton}>
                <IoMdSunny className={styles.themeIcon} /> Light
            </button>
            <button onClick={() => setCurrentTheme('colorful')} className={styles.themeButton}>
                <FaPalette className={styles.themeIcon} /> Colorful
            </button>
        </div>
    );
}

export default ThemeSelector;