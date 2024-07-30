import { createContext, useState, useEffect } from "react";



const LanguageContext = createContext();

export default function LanguageProvider({children}){
    const [isBr, setIsBr] = useState(false);

    const changeLanguage = (boolean) => {
        setIsBr(boolean);
        const localStorageLanguage = JSON.stringify(boolean);
        localStorage.setItem('portfolioLanguage', localStorageLanguage);
    }

    useEffect(() => {
        const language = localStorage.getItem('portfolioLanguage');
        if (language) {
            setIsBr(JSON.parse(language));
        }
    }, []);

    return(
        <LanguageContext.Provider value={{isBr, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}

export {LanguageContext};