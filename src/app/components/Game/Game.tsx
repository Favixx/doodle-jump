import { Sprite, Stage } from "@pixi/react";
import React, { useReducer, useEffect, useRef, useCallback } from "react";
import GameOverModal from "../GameOver/GameOverModal";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

interface Dimensions {
  width: number;
  height: number;
}

interface Platform {
  x: number;
  y: number;
}

interface GameState {
  dimensions: Dimensions;
  playerX: number;
  playerY: number;
  playerVelocity: number;
  platforms: Platform[];
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
        playerX: window.innerWidth / 2,
        playerY: window.innerHeight / 1.7,
      };
    case "gameOver":
      return { ...state, gameOver: true };
    case "addPlatform":
      const newPlatform: Platform = {
        x: Math.random() * (state.dimensions.width - 100),
        y: Math.random() * (state.dimensions.height - 100),
      };
      return { ...state, platforms: [...state.platforms, newPlatform] };
    case "resetPlatforms":
      return { ...state, platforms: [] };
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

  const addPlatform = useCallback(() => {
    dispatch({ type: "addPlatform" });
  }, [dispatch]);

  useEffect(() => {
    if (!state.gameOver && state.platforms.length < 5) {
      console.log("Adding platform due to condition.");
      addPlatform(); // Додаємо платформи, якщо гра триває і їх менше 8
    }
  }, [state.gameOver, state.platforms.length, addPlatform]);

  return (
    <>
      <Stage
        width={state.dimensions.width}
        height={state.dimensions.height}
        options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
      >
        {!state.gameOver &&
          state.platforms.map((platform) => (
            <Sprite
              image="/bub108pg.png"
              key={uuidv4()}
              x={platform.x}
              y={platform.y}
              width={108}
              height={108}
              anchor={0.5}
            />
          ))}

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
