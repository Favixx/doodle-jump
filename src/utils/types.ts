export interface Dimensions {
  width: number;
  height: number;
}

export interface Platform {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ActionType =
  | 'update'
  | 'resize'
  | 'gameOver'
  | 'addPlatform'
  | 'resetPlatforms'
  | 'moveLeft'
  | 'moveRight';

export interface GameState {
  dimensions: Dimensions;
  playerX: number;
  playerY: number;
  playerVelocity: number;
  platforms: Platform[];
  score: number;
  gameOver: boolean;
  direction: 'left' | 'right' | null;
  cameraLift: number;
}
