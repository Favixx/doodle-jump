"use client";
import { Stage } from "@pixi/react";
import * as PIXI from "pixi.js";
import React, { useRef, useEffect } from "react";

const Game: React.FC = () => {
  const gameRef = useRef<HTMLCanvasElement | null>(null);

  const game = new PIXI.Application();

  useEffect(() => {}, []);

  return <Stage> </Stage>;
};

export default Game;
