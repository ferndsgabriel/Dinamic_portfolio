import "./index.css";
import { IoMdMenu  } from "react-icons/io";
import { IoSunnyOutline,IoMoonOutline } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { ThemeContext } from "../../middlewares/themeColor";
import { useContext, useState, useEffect, useRef } from "react";


export default function Header ({value}){
    const {dark, changeThemes} = useContext(ThemeContext);
    const [openNav, setOpenNav] = useState(false);
    const [thereScroll, setThereScroll] = useState(false);
    const navRef = useRef(null);

    const handleOpenNav = () =>{
        setOpenNav(true);
        document.documentElement.classList.add('removeScroll')
    }
    
    const handleCloseNav = () =>{
        setOpenNav(false);
        document.documentElement.classList.remove('removeScroll')
    }
    useEffect(() => {
        const scrollValue = () => {
            const scrollValue = window.scrollY.toFixed();
            if (scrollValue > 200) {
                setThereScroll(true);
            } else {
                setThereScroll(false);
            }
        };

        window.addEventListener("scroll", scrollValue);

        return () => {
            window.removeEventListener("scroll", scrollValue);
        };

    }, []);
    
    useEffect(()=>{
        const thereEscKey = (e) =>{
            if (e.key === 'Escape'){
                handleCloseNav();
            }
        }

        if (openNav){
            document.addEventListener('keydown', thereEscKey);
        }

        return (()=>{
            document.removeEventListener('keydown', thereEscKey);
        })
        
    },[openNav]);


    
    return (
        <>
            <header className='header'>
                {thereScroll?(
                    <>
                        {openNav? null:(
                            <button className="hamburguer" onClick={handleOpenNav}>
                                <img src="./burguer.png" alt="hamburguer icon"/>                        
                            </button>
                        )}
                    </>
                ):(
                    <div className="container">
                        <span>&copy;By {value}</span>
                        <button  onClick={handleOpenNav}><IoMdMenu/></button>
                    </div>
                )}

                
                {openNav ? (
                    <nav className="navArea" ref={navRef}>
                        <div className="closeArea">
                            <button onClick={handleCloseNav}><MdOutlineClose /></button>
                        </div>
                        <ul className="navList">
                            <label className="labelbuttonTheme">
                                <input type="checkbox" className="checkbox" checked={dark} onChange={(e)=>changeThemes(e.target.checked)}/>
                                <span className="buttonTheme">
                                    {dark?(
                                        <IoMoonOutline />
                                    ):(
                                        <IoSunnyOutline />
                                    )}
                                </span>
                            </label>
                            <a href="#projects">Projects</a>
                            <a href="#about">About</a>
                        </ul>
                        <div className="copy">
                            <span>&copy;By {value}</span>
                        </div>
                    </nav>
                ):null}

            </header>
        </>
    )
}
