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
  isPlaying: boolean;
}

export type Action =
  | { type: 'update'; payload: Partial<GameState> }
  | { type: 'resize' }
  | { type: 'gameOver' }
  | { type: 'addPlatform' }
  | { type: 'removePlatform'; payload: { id: string } }
  | { type: 'resetPlatforms' }
  | { type: 'moveLeft' }
  | { type: 'moveRight' }
  | { type: 'startExplosion'; payload: { id: string } };

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

export interface OptionsModalProps {
  onClose: () => void;
}
