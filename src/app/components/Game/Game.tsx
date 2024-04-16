/* eslint-disable react-hooks/exhaustive-deps */
import { Sprite, Stage } from '@pixi/react';
import React, { useReducer, useEffect, useRef, useCallback } from 'react';
import GameOverModal from '../GameOver/GameOverModal';
import { useRouter } from 'next/navigation';
import reducer from '@/utils/reducer';

import {
  GRAVITY,
  PLATFORM_HEIGHT,
  PLATFORM_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_MIDPOINT_THRESOLD,
  PLAYER_WIDTH,
  INITIAL_STATE,
} from '@/utils/constants';

const Game: React.FC = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
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
    const touchX: number = event.touches[0].clientX;
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
      let newVelocity: number = state.playerVelocity + GRAVITY;
      let newY: number = state.playerY + newVelocity;
      let cameraLiftAdjustment: number = 0;

      if (newY < PLAYER_MIDPOINT_THRESOLD) {
        cameraLiftAdjustment = PLAYER_MIDPOINT_THRESOLD - newY;
        newY = PLAYER_MIDPOINT_THRESOLD;
      }

      if (cameraLiftAdjustment !== 0) {
        dispatch({
          type: 'update',
          payload: {
            cameraLift: state.cameraLift + cameraLiftAdjustment,
            platforms: state.platforms.map((platform) => ({
              ...platform,
              y: platform.y + cameraLiftAdjustment,
            })),
          },
        });
      }

      let newX = state.playerX;

      if (state.direction === 'left') {
        newX -= 5;
      } else if (state.direction === 'right') {
        newX += 5;
      }
      newX =
        newX < 0
          ? state.dimensions.width
          : newX > state.dimensions.width
          ? 0
          : newX;

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
      !state.gameOver &&
        state.platforms.forEach((platform) => {
          if (platform.y + platform.height / 2 >= window.innerHeight) {
            dispatch({ type: 'removePlatform', payload: { id: platform.id } });
            addPlatform();
          }
        });
      !state.gameOver && (requestRef.current = requestAnimationFrame(animate));
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [
    state.playerVelocity,
    state.playerY,
    state.playerX,
    state.dimensions.height,
    state.direction,
    dispatch,
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
      addPlatform();
    }
  }, [state.gameOver, state.platforms.length, addPlatform]);

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
      const platformTop = platform.y - platformHeight / 2 + state.cameraLift;

      if (
        playerRight > platformLeft &&
        playerLeft < platformRight &&
        playerBottom > platformTop &&
        playerBottom - state.playerVelocity < platformTop
      ) {
        const playerAbovePlatform =
          state.playerY < platform.y + state.cameraLift;

        if (playerAbovePlatform) {
          dispatch({
            type: 'removePlatform',
            payload: { id: platform.id },
          });

          const jumpSpeed = -3;
          let newPlayerVelocity = jumpSpeed;

          const jump = () => {
            if (newPlayerVelocity < 0) {
              newPlayerVelocity += GRAVITY;

              dispatch({
                type: 'update',
                payload: {
                  playerVelocity: newPlayerVelocity,
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
            const adjustedY = platform.y + state.cameraLift;

            if (adjustedY < window.innerHeight) {
              return (
                <Sprite
                  image='/bub108pg.png'
                  key={platform.id}
                  x={adjustedX}
                  y={adjustedY}
                  width={PLATFORM_WIDTH}
                  height={PLATFORM_HEIGHT}
                  anchor={0.5}
                />
              );
            }
            return null;
          })}

        {!state.gameOver && (
          <Sprite
            x={state.playerX}
            y={state.playerY}
            image='/star320.png'
            width={PLAYER_WIDTH}
            height={PLAYER_HEIGHT}
            anchor={0.5}
          />
        )}
      </Stage>
      {state.gameOver && <GameOverModal onClose={handleModalClose} />}
    </>
  );
};

export default Game;
