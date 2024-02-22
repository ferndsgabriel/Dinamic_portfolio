import {RoutesApp} from "./routes";
import './App.css';
import ThemeProvider from './middlewares/themeColor';
import { useRef, useEffect } from "react";

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
        <span ref={blurScrollRef} className="animate"></span>
        <RoutesApp/>
      </ThemeProvider>
    </div>
  );
}

export default App;
