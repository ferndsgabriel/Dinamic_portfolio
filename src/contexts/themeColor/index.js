import React, { createContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [dark, setDark] = useState(true);

    const changeThemes = (boolean) => {
        setDark(boolean);
        const localStorageTheme = JSON.stringify(boolean);
        localStorage.setItem('portfolioTheme', localStorageTheme);
    }

    useEffect(() => {
        const theme = localStorage.getItem('portfolioTheme');
        if (theme) {
            setDark(JSON.parse(theme));
        }
    }, []);
    

    useEffect(() => {
        const root = document.documentElement.style;
        root.setProperty('--Primary', !dark ? 'rgb(252,252,252)' : 'rgb(43,43,43)');
        root.setProperty('--Primary2', !dark ? 'rgb(183,183,183)' : 'rgb(128,128,128)');
        root.setProperty('--Primary3', !dark ? 'rgb(230,230,230)': 'rgb(49,49,49)');
        root.setProperty('--Primary4', !dark ? 'rgb(230,230,230)' : 'rgb(37,37,37)');
        root.setProperty('--Secondary', !dark ? 'rgb(4,124,132)' : 'rgb(4,179,121)');
        root.setProperty('--Secondary2', !dark ? 'rgba(4,124,132,0.2)' : 'rgba(4,179,121,0.2)');
        root.setProperty('--Text', !dark ? 'rgb(0,0,0)' : 'rgb(255,255,255)');
        root.setProperty('--Black', 'rgb(0,0,0)');
        root.setProperty('--Shadow', 'rgba(0,0,0,0.5)');
        root.setProperty('--White','rgb(255,255,255)');
    }, [dark]);

    return (
        <ThemeContext.Provider value={{ dark, changeThemes }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext };
