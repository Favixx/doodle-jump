"use client";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const StyledCanvas = styled.canvas`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
    }
  }, []);

  return <StyledCanvas ref={canvasRef} />;
};

export default Game;
