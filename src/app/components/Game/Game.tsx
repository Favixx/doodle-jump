"use client";
import { Stage } from "@pixi/react";
import React, { useRef, useEffect } from "react";

const Game: React.FC = () => {
  const gameRef = useRef<HTMLCanvasElement | null>(null);
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;
  const options = {
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
  };

  useEffect(() => {}, []);

  return <Stage width={width} height={height} options={options}></Stage>;
};

export default Game;
