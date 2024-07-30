import "./index.css";
import { FaCaretUp } from "react-icons/fa6";
import  "./index.css"
import { useEffect, useState } from "react";

export default function ScrollTop(){
    const [isVisible, setIsVisible] = useState(false);

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

    function scroll(){
        window.scrollTo({
            "behavior":"smooth",
            "top":0
        })
    };

    return(
        <>
            {isVisible?(
                <button className="backToTop" onClick={scroll}>
                    <div>
                        < FaCaretUp/>
                    </div>
                </button>
            ):null}
        </>
    )
}