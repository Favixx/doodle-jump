import React, { useState, useEffect } from "react";

const LoadingText = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <h1>Loading{dots}</h1>;
};

export default LoadingText;
