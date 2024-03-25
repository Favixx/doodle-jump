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
}

// Добавляем новые действия для обработки движения игрока влево и вправо
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
  score: number;
  gameOver: boolean;
  // Новое свойство для отслеживания направления движения
  direction: 'left' | 'right' | null;
  cameraY: number;
  platformYOffset: number;
  targetPlatformYOffset: number;
}

const initialState: GameState = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  playerX: window.innerWidth / 2,
  playerY: window.innerHeight / 1.7,
  playerVelocity: 0,
  platforms: [],
  score: 0,
  gameOver: false,
  direction: null, // Изначально игрок не двигается
  cameraY: 0,
  platformYOffset: 0,
  targetPlatformYOffset: 0,
};

const gravity = 0.01;

function lerp(start: number, end: number, alpha: number): number {
  return start + (end - start) * alpha;
}

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
      const newPlatform: Platform = {
        id: uuidv4(),
        x: Math.random() * (state.dimensions.width - 100),
        y: Math.random() * (state.dimensions.height - 100),
      };
      return { ...state, platforms: [...state.platforms, newPlatform] };
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

  // Обработчики событий для движения влево и вправо
  const handleMoveLeft = () => {
    dispatch({ type: 'moveLeft' });
  };

  const handleMoveRight = () => {
    dispatch({ type: 'moveRight' });
  };

  useEffect(() => {
    // Добавляем слушателей для событий касания
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Обработка начала касания
  const handleTouchStart = (event: TouchEvent) => {
    const touchX = event.touches[0].clientX;
    // Определяем, с какой стороны экрана произошло касание и вызываем соответствующий обработчик
    if (touchX < window.innerWidth / 2) {
      handleMoveLeft();
    } else {
      handleMoveRight();
    }
  };

  // Обработка окончания касания
  const handleTouchEnd = () => {
    // При окончании касания останавливаем движение игрока
    dispatch({ type: 'update', payload: { direction: null } });
  };

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'resize' });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Модифицируем метод animate для учета текущего направления движения
  useEffect(() => {
    const animate = () => {
      const newVelocity = state.playerVelocity + gravity;
      const newY = state.playerY + newVelocity;
      let newX = state.playerX;

      const newPlatformYOffset = lerp(
        state.platformYOffset,
        state.targetPlatformYOffset,
        0.05
      ); // Плавно змінюємо положення платформ
      dispatch({
        type: 'update',
        payload: {
          platformYOffset: newPlatformYOffset,
        },
      });

      // Обновляем положение игрока по оси X с учетом текущего направления
      if (state.direction === 'left') {
        newX -= 5;
      } else if (state.direction === 'right') {
        newX += 5;
      }
      // Перемещаем игрока на противоположную сторону, если он вышел за границы экрана
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
    if (!state.gameOver && state.platforms.length < 5) {
      console.log('Adding platform due to condition.');
      addPlatform(); // Додаємо платформи, якщо гра триває і їх менше 8
    }
  }, [state.gameOver, state.platforms.length, addPlatform]);

  // 18.03 проверка на соприкосновение игрока с платформой
  useEffect(() => {
    checkCollision(); // Перевірка зіткнення при кожному оновленні стану гравця або платформ
  }, [state.playerX, state.playerY, state.platforms]);

  const checkCollision = () => {
    const playerWidth = 120; // Ширина гравця
    const playerHeight = 120; // Висота гравця

    // Координати границь гравця
    const playerLeft = state.playerX - playerWidth / 2;
    const playerRight = state.playerX + playerWidth / 2;
    // const playerTop = state.playerY - playerHeight / 2;
    const playerBottom = state.playerY + playerHeight / 2;

    state.platforms.forEach((platform) => {
      const platformWidth = 108; // Ширина платформи
      const platformHeight = 108; // Висота платформи

      // Координати границь платформи
      const platformLeft = platform.x - platformWidth / 2;
      const platformRight = platform.x + platformWidth / 2;
      const platformTop = platform.y - platformHeight / 2;
      // const platformBottom = platform.y + platformHeight / 2;

      // Перевірка перетину границь гравця і платформи
      if (
        playerRight > platformLeft &&
        playerLeft < platformRight &&
        playerBottom > platformTop &&
        playerBottom - state.playerVelocity < platformTop
      ) {
        // Якщо є зіткнення, виконуємо необхідні дії, наприклад, змінюємо рахунок, тощо
        console.log('Collision with platform!');
        // Якщо гравець знаходиться над платформою, то робимо пружинний стрибок
        const playerAbovePlatform = state.playerY < platform.y;

        if (playerAbovePlatform) {
          const newPlatforms = state.platforms.filter(
            (p) => p.id !== platform.id
          );

          const cameraLift = state.playerY - state.dimensions.height / 2;

          const newPlatform: Platform = {
            id: uuidv4(),
            x: Math.random() * (state.dimensions.width - 100),
            y: Math.random() * (state.dimensions.height - 100),
          };

          dispatch({
            type: 'update',
            payload: {
              platforms: [...newPlatforms, newPlatform],
              cameraY: state.cameraY + cameraLift,
            },
          });

          const jumpSpeed = -3; // Швидкість стрибка (від'ємне значення для руху вверх)

          let newPlayerVelocity = jumpSpeed; // Нова швидкість гравця під час стрибка
          const gravity = 0.9; // Гравітація

          // Функція для анімації стрибка
          const jump = () => {
            if (newPlayerVelocity < 0) {
              // Поки гравець рухається вверх
              const newY = state.playerY + newPlayerVelocity; // Нова вертикальна позиція гравця
              newPlayerVelocity += gravity; // Збільшуємо швидкість падіння згідно гравітації

              dispatch({
                type: 'update',
                payload: {
                  playerVelocity: -3,
                  playerY: platformTop - playerHeight / 2,
                },
              });

              dispatch({
                type: 'update',
                payload: {
                  targetPlatformYOffset: state.targetPlatformYOffset + 100, // Припустимо, що ми хочемо підняти екран на 100 пікселів
                },
              });

              requestAnimationFrame(jump); // Продовжуємо анімацію стрибка
            }
          };

          jump(); // Розпочинаємо анімацію стрибка
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
          state.platforms.map((platform) => (
            <Sprite
              image='/bub108pg.png'
              key={uuidv4()}
              x={platform.x}
              y={platform.y + state.platformYOffset}
              width={108}
              height={108}
              anchor={0.5}
            />
          ))}

        {!state.gameOver && (
          <Sprite
            x={state.playerX}
            y={state.playerY - state.cameraY}
            image='/star320.png'
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
