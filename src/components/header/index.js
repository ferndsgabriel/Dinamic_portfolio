import "./index.css";
import { MdOutlineMenu, MdOutlineClose, MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useRef, useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../contexts/themeColor";
import { LanguageContext } from "../../contexts/languageControl";

export default function Header({ value }) {
    const [isOpenNav, setIsOpenNav] = useState(false);
    const navRef = useRef(null);
    const { dark, changeThemes } = useContext(ThemeContext);
    const { isBr, changeLanguage } = useContext(LanguageContext);
    const [isVisible, setIsVisible] = useState(false);

    function closeNav() {
        navRef.current?.classList.add('navClose');
        setTimeout(() => {
            setIsOpenNav(false);
            navRef.current?.classList.remove('navClose');
        }, 500);
    }

    function handleClickOutside(event) {
        if (navRef.current && !navRef.current.contains(event.target)) {
            closeNav();
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Escape") {
            closeNav();
        }
    }

    useEffect(() => {
        if (isOpenNav) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpenNav]);

    useEffect(() => {
        function handleScroll () {
            if (window.scrollY > 400){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className="headerContainer">
                <h4>&copy; By {value}</h4>
                {!isOpenNav?(
                    <button onClick={() => setIsOpenNav(true)}>
                        <MdOutlineMenu />
                    </button>
                ):null}
            </header>

            {isOpenNav ? (
                <nav className="navContainer" ref={navRef}>
                    <button className="close" onClick={closeNav}>
                        <MdOutlineClose />
                    </button>
                    <ul className="ul">
                        <button className="buttonTheme" onClick={() => changeThemes(!dark)} style={{ justifyContent: dark ? 'end' : 'start' }}>
                            {!dark ? (
                                <MdLightMode className="light" />
                            ) : (
                                <FaMoon className="dark" />
                            )}
                        </button>

                        <button className="buttonLanguage" onClick={() => changeLanguage(!isBr)}>
                            {isBr ? (
                                <p><b>BR</b> / EN</p>
                            ) : (
                                <p><b>EN</b> / BR</p>
                            )}
                        </button>
                    </ul>
                    <span>&copy; By {value}</span>
                </nav>
            ) : null}

            {isVisible && !isOpenNav?(
                <button className="floatMenu" onClick={() => setIsOpenNav(true)}>
                    <div>
                        <MdOutlineMenu />
                    </div>
                </button>
            ):null}

        </>
    );
}
