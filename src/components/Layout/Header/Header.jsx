import { NavLink } from "react-router"; 
import css from "./Header.module.css";
import { MdLocalMovies } from "react-icons/md";
import ThemeSelector from '../../ThemeSwitcher/ThemeSelector.jsx'


function Header() {
    const handleActive = (isActive) =>
        isActive ? `${css.active} ${css.link}` : css.link;

    return (
        <header className={css.header}>
            <div className={css.container}>
                <NavLink to="/" className={css.logo}>
                    <MdLocalMovies className={css.icon} />
                    CineMingle
                </NavLink>
                <nav className={css.nav}>
                    <ul className={css.list}>
                        <li className={css.item}>
                            <NavLink to="/" className={({ isActive }) => handleActive(isActive)}>
                                Home
                            </NavLink>
                        </li>
                        <li className={css.item}>
                            <NavLink to="/movies" className={({ isActive }) => handleActive(isActive)}>
                                Movies
                            </NavLink>
                        </li>
                        <li className={css.item}>
                            <NavLink to="/library" className={({ isActive }) => handleActive(isActive)}>
                                My Library
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <ThemeSelector />
            </div>
        </header>
    );
}

export default Header;
