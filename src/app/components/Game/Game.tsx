import { Sprite, Stage } from "@pixi/react";
import React, { useReducer, useEffect, useRef } from "react";
import GameOverModal from "../GameOver/GameOverModal";
import { useRouter } from "next/navigation";

interface Dimensions {
  width: number;
  height: number;
}

interface GameState {
  dimensions: Dimensions;
  playerX: number;
  playerY: number;
  playerVelocity: number;
  platforms: any[]; // Define more specifically if needed
  score: number;
  gameOver: boolean;
}

const initialState: GameState = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  playerX: window.innerWidth / 2,
  playerY: window.innerHeight / 1.7,
  playerVelocity: 0,
  platforms: [],
  score: 0,
  gameOver: false,
};

const gravity = 0.01;

function reducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "resize":
      return {
        ...state,
        dimensions: { width: window.innerWidth, height: window.innerHeight },
        playerX: window.innerWidth / 2, // Reset player X position
        playerY: window.innerHeight / 1.7, // Reset player Y position
      };
    case "gameOver":
      return { ...state, gameOver: true };
    default:
      return state;
  }
}

const Game: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: "resize" });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animate = () => {
      const newVelocity = state.playerVelocity + gravity;
      const newY = state.playerY + newVelocity;

      if (newY > state.dimensions.height) {
        dispatch({ type: "gameOver" });
      } else {
        dispatch({
          type: "update",
          payload: { playerVelocity: newVelocity, playerY: newY },
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [state.playerVelocity, state.playerY, state.dimensions.height]);

  const handleModalClose = () => {
    router.push("/");
    dispatch({ type: "gameOver", payload: { gameOver: false } });
  };

  return (
    <>
      <Stage
        width={state.dimensions.width}
        height={state.dimensions.height}
        options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
      >
        {!state.gameOver && (
          <Sprite
            x={state.playerX}
            y={state.playerY}
            image="/star320.png"
            width={120}
            height={120}
            anchor={0.5}
          />
        )}
      </Stage>
      {state.gameOver && <GameOverModal onClose={handleModalClose} />}
    </>
  );
};

export default Game;
