/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from '@pixi/react';
import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import GameOverModal from '../GameOver/GameOverModal';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

interface Dimensions {
  width: number;
  height: number;
}

interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

type ActionType =
  | 'update'
  | 'resize'
  | 'gameOver'
  | 'addPlatform'
  | 'resetPlatforms'
  | 'moveLeft'
  | 'moveRight';

interface GameState {
  dimensions: Dimensions;
  playerX: number;
  playerY: number;
  playerVelocity: number;
  platforms: Platform[];
  platformsWidth: number;
  platformsHeight: number;
  score: number;
  gameOver: boolean;
  direction: 'left' | 'right' | null;
  cameraLift: number;
}

const initialState: GameState = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  playerX: window.innerWidth / 2,
  playerY: window.innerHeight / 1.7,
  playerVelocity: 0,
  platforms: [
    {
      id: uuidv4(),
      x: window.innerWidth / 2,
      y: window.innerHeight - 100,
      width: 108,
      height: 108,
    },
  ],
  platformsWidth: 108,
  platformsHeight: 108,
  score: 0,
  gameOver: false,
  direction: null,
  cameraLift: 0,
};

const gravity = 0.02;

function reducer(state: GameState, action: any): GameState {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload };
    case 'resize':
      return {
        ...state,
        dimensions: { width: window.innerWidth, height: window.innerHeight },
        playerX: window.innerWidth / 2,
        playerY: window.innerHeight / 1.7,
      };
    case 'gameOver':
      return { ...state, gameOver: true };
    case 'addPlatform':
      if (state.platforms.length < 5) {
        const randomX = Math.floor(
          Math.random() * (window.innerWidth - state.platformsWidth)
        );
        const randomY = Math.floor(
          Math.random() * (window.innerHeight - state.platformsHeight)
        );

        const newPlatform: Platform = {
          id: uuidv4(),
          x: randomX,
          y: randomY,
          width: state.platformsWidth,
          height: state.platformsHeight,
        };
        return { ...state, platforms: [...state.platforms, newPlatform] };
      }

      return {
        ...state,
      };
    case 'resetPlatforms':
      return { ...state, platforms: [] };
    case 'moveLeft':
      return { ...state, direction: 'left' };
    case 'moveRight':
      return { ...state, direction: 'right' };
    default:
      return state;
  }
}

const Game: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const requestRef = useRef<number>();

  const handleMoveLeft = () => {
    dispatch({ type: 'moveLeft' });
  };

  const handleMoveRight = () => {
    dispatch({ type: 'moveRight' });
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleTouchStart = (event: TouchEvent) => {
    const touchX = event.touches[0].clientX;
    if (touchX < window.innerWidth / 2) {
      handleMoveLeft();
    } else {
      handleMoveRight();
    }
  };

  const handleTouchEnd = () => {
    dispatch({ type: 'update', payload: { direction: null } });
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'resize' });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const animate = () => {
      const newVelocity = state.playerVelocity + gravity;
      const newY = state.playerY + newVelocity;
      let newX = state.playerX;

      if (state.direction === 'left') {
        newX -= 5;
      } else if (state.direction === 'right') {
        newX += 5;
      }
      if (newX < 0) {
        newX = state.dimensions.width;
      } else if (newX > state.dimensions.width) {
        newX = 0;
      }

      if (newY > state.dimensions.height) {
        dispatch({ type: 'gameOver' });
      } else {
        dispatch({
          type: 'update',
          payload: {
            playerVelocity: newVelocity,
            playerY: newY,
            playerX: newX,
          },
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [
    state.playerVelocity,
    state.playerY,
    state.playerX,
    state.dimensions.height,
    state.direction,
  ]);

  const handleModalClose = () => {
    router.push('/');
    dispatch({ type: 'gameOver', payload: { gameOver: false } });
  };

  const addPlatform = useCallback(() => {
    dispatch({ type: 'addPlatform' });
  }, [dispatch]);

  useEffect(() => {
    if (!state.gameOver) {
      console.log('Adding platform due to condition.');
      addPlatform();
    }
  }, [state.gameOver, state.platforms.length, addPlatform]);

  const addPlatformNew = () => {
    const randomX = Math.floor(
      Math.random() * (window.innerWidth - state.platformsWidth)
    );
    const randomY = Math.floor(
      Math.random() * (window.innerHeight - state.platformsHeight)
    );

    const newPlatform: Platform = {
      id: uuidv4(),
      x: randomX,
      y: randomY,
      width: state.platformsWidth,
      height: state.platformsHeight,
    };
    return { ...state, platforms: [...state.platforms, newPlatform] };
  };

  useEffect(() => {
    checkCollision();
  }, [state.playerX, state.playerY, state.platforms]);

  const checkCollision = () => {
    const playerWidth = 120;
    const playerHeight = 120;

    const playerLeft = state.playerX - playerWidth / 2;
    const playerRight = state.playerX + playerWidth / 2;
    const playerBottom = state.playerY + playerHeight / 2;

    state.platforms.forEach((platform) => {
      const platformWidth = 108;
      const platformHeight = 108;

      const platformLeft = platform.x - platformWidth / 2;
      const platformRight = platform.x + platformWidth / 2;
      const platformTop = platform.y - platformHeight / 2;

      if (
        playerRight > platformLeft &&
        playerLeft < platformRight &&
        playerBottom > platformTop &&
        playerBottom - state.playerVelocity < platformTop
      ) {
        console.log('Collision with platform!');
        const playerAbovePlatform = state.playerY < platform.y;

        if (playerAbovePlatform) {
          const platformsFilter = state.platforms.filter(
            (p) => p.id !== platform.id
          );

          dispatch({
            type: 'update',
            payload: { platforms: [...platformsFilter] },
          });

          const jumpSpeed = -3;
          let newPlayerVelocity = jumpSpeed;
          const gravity = 0.9;

          const jump = () => {
            if (newPlayerVelocity < 0) {
              const newY = state.playerY + newPlayerVelocity;
              newPlayerVelocity += gravity;

              dispatch({
                type: 'update',
                payload: {
                  playerVelocity: -3,
                  playerY: platformTop - playerHeight / 2,
                },
              });

              requestAnimationFrame(jump);
            }
          };

          jump();
        }
      }
    });
  };

  return (
    <>
      <Stage
        width={state.dimensions.width}
        height={state.dimensions.height}
        options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
      >
        {!state.gameOver &&
          state.platforms.map((platform) => {
            const adjustedX = Math.max(
              platform.width / 2,
              Math.min(window.innerWidth - platform.width / 2, platform.x)
            );
            const adjustedY = Math.max(
              platform.height / 2,
              Math.min(window.innerHeight - platform.height / 2, platform.y)
            );

            return (
              <Sprite
                image="/bub108pg.png"
                key={platform.id}
                x={adjustedX}
                y={adjustedY}
                width={108}
                height={108}
                anchor={0.5}
              />
            );
          })}

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
