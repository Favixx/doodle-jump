import { StaticImageData } from 'next/image';

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
  speedY: number;
  speedX: number;
  platforms: Platform[];
  score: number;
  gameOver: boolean;
  cameraLift: number;
  wishPlayerX: number | null;
}

export interface Skin {
  id: number;
  name: string;
  source: StaticImageData;
  width: number;
  quality: string;
  main320: StaticImageData; // Путь к изображению для ширины 320
  main640: StaticImageData; // Путь к изображению для ширины 640
  main768: StaticImageData; // Путь к изображению для ширины 768
}

export interface OptionsModalProps {
  onClose: () => void;
}
export interface ShopModalProps {
  onClose: () => void;
}
export interface BalanceModalProps {
  onClose: () => void;
}
export interface MainSkinModalProps {
  onClose: () => void;
  card: Skin | undefined;
}
