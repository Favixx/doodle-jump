import React, { useState, useEffect } from "react";
import styled from "styled-components";

const LoadingTextStyled = styled.h1``;

const LoadingText = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <LoadingTextStyled>Loading{dots}</LoadingTextStyled>;
};

export default LoadingText;
