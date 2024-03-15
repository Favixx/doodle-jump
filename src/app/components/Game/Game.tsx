"use client";
import { Sprite, Stage, useApp } from "@pixi/react";
import React, { useEffect, useState } from "react";
import GameOverModal from "../GameOver/GameOverModal";

interface Dimensions {
  width: number;
  height: number;
}

interface Platforms {
  x: number;
  y: number;
}

const Game: React.FC = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [playerX, setPlayerX] = useState<number>(dimensions.width / 2);
  const [playerY, setPlayerY] = useState<number>(300);
  const [playerVelocity, setPlayerVelocity] = useState<number>(0);
  const gravity: number = 0.0005;
  const jumpHeight: number = -10;
  const [platforms, setPlatforms] = useState<Platforms[]>([]);
  //
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleModalClose = () => {
    setGameOver(false);
  };
  //
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    let animationFrameId: number = 0;

    const update = () => {
      const newVelocity = playerVelocity + gravity;
      const newY = playerY + newVelocity;

      if (newY > dimensions.height) {
        setGameOver(true);
        setPlayerY(dimensions.height);
      } else {
        setPlayerVelocity(newVelocity);
        setPlayerY(newY);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions.height, jumpHeight, playerVelocity, playerY]); // Залишаємо лише dimensions.height у масиві залеж

  const options = {
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
  };

  return (
    <>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        options={options}
      >
        {/* Render player */}
        {!gameOver && (
          <Sprite x={playerX} y={playerY} image="/star320.png" anchor={0.5} />
        )}
      </Stage>
      {gameOver && <GameOverModal onClose={handleModalClose} />}
    </>
  );
};

export default Game;
