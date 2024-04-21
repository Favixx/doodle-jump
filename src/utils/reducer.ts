import { v4 as uuidv4 } from 'uuid';
import { GameState, Platform } from './types';
import { PLATFORM_HEIGHT, PLATFORM_WIDTH } from './constants';

export default function reducer(state: GameState, action: any): GameState {
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
      const randomX = Math.floor(
        Math.random() * (window.innerWidth - PLATFORM_WIDTH)
      );
      const randomY = Math.floor(
        state.platforms[state.platforms.length - 1].y - PLATFORM_HEIGHT - 60
      );

      const newPlatform: Platform = {
        id: uuidv4(),
        x: randomX,
        y: randomY,
        isPlaying: false,
        width: PLATFORM_WIDTH,
        height: PLATFORM_HEIGHT,
      };
      return { ...state, platforms: [...state.platforms, newPlatform] };
    case 'startExplosion':
      return {
        ...state,
        platforms: state.platforms.map((platform) =>
          platform.id === action.payload.id
            ? { ...platform, isPlaying: true }
            : platform
        ),
      };
    case 'removePlatform':
      const { id } = action.payload;
      console.log(id);
      return {
        ...state,
        platforms: state.platforms.filter((platform) => platform.id !== id),
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