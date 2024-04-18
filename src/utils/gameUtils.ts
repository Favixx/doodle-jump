import { Dispatch } from 'react';
import { Action, GameState, Platform } from './types';
import { GRAVITY, PLAYER_MIDPOINT_THRESOLD } from './constants';
import { addPlatform } from './actions';

export const checkCollision = (
  state: GameState,
  dispatch: Dispatch<Action>
) => {
  const playerWidth = 120;
  const playerHeight = 120;

  state.platforms.forEach((platform) => {
    if (
      state.playerX + playerWidth / 2 > platform.x - platform.width / 2 &&
      state.playerX - playerWidth / 2 < platform.x + platform.width / 2 &&
      state.playerY + playerHeight / 2 >
        platform.y - platform.height / 2 + state.cameraLift &&
      state.playerY + playerHeight / 2 - state.playerVelocity <
        platform.y - platform.height / 2 + state.cameraLift
    ) {
      dispatch({
        type: 'update',
        payload: {
          playerVelocity: -2.9,
          playerY:
            platform.y -
            platform.height / 2 +
            state.cameraLift -
            playerHeight / 2,
        },
      });
      dispatch({ type: 'startExplosion', payload: { id: platform.id } });
    }
  });
};

export const animate = (state: GameState, dispatch: Dispatch<Action>) => {
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
        platforms: state.platforms.map((platform: Platform) => ({
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

  if (!state.gameOver) {
    addPlatform(dispatch);
    state.platforms.forEach((platform: Platform) => {
      if (platform.y + platform.height / 2 >= window.innerHeight) {
        dispatch({ type: 'startExplosion', payload: { id: platform.id } });
        addPlatform(dispatch);
      }
    });
  }
};
