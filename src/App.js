import {RoutesApp} from "./routes";
import './App.css';
import ThemeProvider from "./contexts/themeColor";
import LanguageProvider from "./contexts/languageControl";
import { useRef, useEffect } from "react";
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const blurScrollRef = useRef(null);
  useEffect(() => {
    const moveBlur = (mouse) => {
        const x = mouse.clientX;
        const y = mouse.clientY;
        if (blurScrollRef.current) {
            blurScrollRef.current.style.transform = `translate(${x}px, ${y}px)`;
            blurScrollRef.current.classList.add('animationBackground');
        }
    };

    document.addEventListener('mousemove', moveBlur);

    return () => {
        document.removeEventListener('mousemove', moveBlur);
    };

}, []);
  return (
    <div className="App">
      <ThemeProvider>
        <LanguageProvider>
          <RoutesApp/>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
