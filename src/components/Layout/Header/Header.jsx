import { useState } from "react";
import { NavLink } from "react-router"; 
import { MdLocalMovies } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi"; 
import ThemeSelector from "../../ThemeSwitcher/ThemeSelector.jsx";
import css from "./Header.module.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleActive = (isActive) =>
        isActive ? `${css.active} ${css.link}` : css.link;

    return (
        <header className={css.header}>
            <div className={css.container}>
                {/* Logo */}
                <NavLink to="/" className={css.logo}>
                    <MdLocalMovies className={css.icon} />
                    CineMingle
                </NavLink>
                
                {/* Sağ üstte sadece mobilde görünen ThemeSelector */}
                <div className={css.themeDesktop}>
                    <ThemeSelector />
                </div>

                {/* Hamburger Butonu - Mobilde Görünür */}
                <button className={css.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Menü */}
                <nav className={`${css.nav} ${menuOpen ? css.open : ""}`}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            <NavLink to="/" className={({ isActive }) => handleActive(isActive)} onClick={() => setMenuOpen(false)}>
                                Home
                            </NavLink>
                        </li>
                        <li className={css.item}>
                            <NavLink to="/movies" className={({ isActive }) => handleActive(isActive)} onClick={() => setMenuOpen(false)}>
                                Movies
                            </NavLink>
                        </li>
                        <li className={css.item}>
                            <NavLink to="/library" className={({ isActive }) => handleActive(isActive)} onClick={() => setMenuOpen(false)}>
                                My Library
                            </NavLink>
                        </li>

                        {/* Theme Selector - Mobilde Menü İçinde */}
                        <li className={css.themeMobile}>
                            <ThemeSelector />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
