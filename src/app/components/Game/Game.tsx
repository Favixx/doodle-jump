"use client";
import { Stage } from "@pixi/react";
import React, { useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

const Game: React.FC = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const options = {
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
  };

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      options={options}
    ></Stage>
  );
};

export default Game;
