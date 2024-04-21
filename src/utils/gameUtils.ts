import { Dispatch } from 'react';
import { Action, GameState, Platform } from './types';
import { GRAVITY, PLAYER_MIDPOINT_THRESOLD, PLAYER_WIDTH, PLAYER_HEIGHT } from './constants';
import { addPlatform } from './actions';
import next from 'next';

export const checkCollision = (
    state: GameState,
    dispatch: Dispatch<Action>
) => {
    state.platforms.forEach((platform) => {
        if (
            state.playerX + PLAYER_WIDTH / 2 > platform.x - platform.width / 2 &&
            state.playerX - PLAYER_WIDTH / 2 < platform.x + platform.width / 2 &&
            state.playerY + PLAYER_HEIGHT / 2 >
            platform.y - platform.height / 2 + state.cameraLift &&
            state.playerY + PLAYER_HEIGHT / 2 - state.speedY <
            platform.y - platform.height / 2 + state.cameraLift
        ) {
            dispatch({
                type: 'update',
                payload: {
                    speedY: -3.5,
                    playerY:
                        platform.y -
                        platform.height / 2 +
                        state.cameraLift -
                        PLAYER_HEIGHT / 2,
                },
            });
            dispatch({ type: 'startExplosion', payload: { id: platform.id } });
        }
    });
};

export const lerp = (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b;
}

export const animate = (state: GameState, dispatch: Dispatch<Action>) => {
    if (state.platforms.length < 15) {
        addPlatform(dispatch);
    }
    let newVelocity: number = state.speedY + GRAVITY;
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

    let newX = lerp(state.playerX, state.wishPlayerX ?? state.playerX, 0.03);

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
                speedY: newVelocity,
                playerY: newY,
                playerX: newX,
            },
        });
    }

    state.platforms.forEach((platform: Platform) => {
        if (platform.y + platform.height / 2 >= window.innerHeight) {
            dispatch({ type: 'startExplosion', payload: { id: platform.id } });
        }
    });
};
