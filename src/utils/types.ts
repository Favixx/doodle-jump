import { WebSocket } from "ws";

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
    hasCoin: boolean;
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
    websocket: WebSocket | null;
    // lastFrameTime: number;
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