import { useEffect, useState } from "react";
import "./index.css"

export default function Loading() {
    const [index, setIndex] = useState(0);
    const allHellos = [
        "Hi",
        "Hola",
        "Bonjour",
        "你好",
        "مرحبا",
        "Привет",
        "Halo",
        "Hallo",
        "こんにちは",
        "Ciao",
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (index < allHellos.length - 1) {
                setIndex(index + 1);
            } else {
                setIndex(0);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [index, allHellos.length]);

    const hellosIdiomues = () => {
        return <span style={{fontSize:'24px'}} translate="no">● {allHellos[index]}</span>;
    };

    return (
        <div className="containerLoading">
            {hellosIdiomues()}
        </div>
    );
}
