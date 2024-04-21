import { v4 as uuidv4 } from 'uuid';
import { GameState } from './types';
export const GRAVITY: number = 0.033;
export const PLAYER_MIDPOINT_THRESOLD: number = window.innerHeight / 2;
export const PLATFORM_WIDTH: number = 100;
export const PLATFORM_HEIGHT: number = 100;
export const PLAYER_WIDTH: number = 100;
export const PLAYER_HEIGHT: number = 100;
export const BUBBLE_FRAMES: string[] = [
    '/bubble/bubble_frame_1.png',
    '/bubble/bubble_frame_2.png',
    '/bubble/bubble_frame_3.png',
    '/bubble/bubble_frame_4.png',
    '/bubble/bubble_frame_5.png',
    // '/bubble/bubble_frame_6.png',
];
export const INITIAL_STATE: GameState = {
    dimensions: {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    playerX: window.innerWidth / 2,
    playerY: window.innerHeight / 1.7,
    speedX: 0,
    speedY: 0,
    platforms: [
        {
            id: uuidv4(),
            x: window.innerWidth / 2,
            y: window.innerHeight - 100,
            isPlaying: false,
            width: 108,
            height: 108,
        },
    ],
    score: 0,
    gameOver: false,
    cameraLift: 0,
    wishPlayerX: null,
};
