import React, { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../../hooks/ThemeContext.jsx"; // Yol doğru olmalı
import { IoMdSunny } from "react-icons/io";
import { FaPalette, FaMoon } from "react-icons/fa";
import styles from "./ThemeSelector.module.css";

function ThemeSelector() {
    const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Menünün DOM referansı

    // Aktif tema ikonunu belirleme
    const getThemeIcon = () => {
        switch (currentTheme) {
            case "dark":
                return <FaMoon />;
            case "light":
                return <IoMdSunny />;
            case "colorful":
                return <FaPalette />;
            default:
                return <IoMdSunny />;
        }
    };

    // Dışarıya tıklama kontrolü
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false); // Dışarıya tıklandığında menüyü kapat
            }
        };

        // Dışarıya tıklama olayını dinle
        document.addEventListener("mousedown", handleClickOutside);

        // Temizleme
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.themeSelector} ref={menuRef}>
            {/* Tema Aç/Kapa Butonu */}
            <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                {getThemeIcon()}
            </button>

            {/* Açılır Tema Seçenekleri */}
            <div className={`${styles.themeButtons} ${menuOpen ? styles.menuOpen : ""}`}>
                <button onClick={() => setCurrentTheme("dark")} className={styles.themeButton}>
                    <FaMoon className={styles.themeIcon} /> Dark
                </button>
                <button onClick={() => setCurrentTheme("light")} className={styles.themeButton}>
                    <IoMdSunny className={styles.themeIcon} /> Light
                </button>
                <button onClick={() => setCurrentTheme("colorful")} className={styles.themeButton}>
                    <FaPalette className={styles.themeIcon} /> Colorful
                </button>
            </div>
        </div>
    );
}

export default ThemeSelector;
