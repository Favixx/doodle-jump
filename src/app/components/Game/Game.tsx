import React, { useCallback, useEffect, useRef } from 'react';
import { AnimatedSprite, Sprite, Stage } from '@pixi/react';
import GameOverModal from '../GameOver/GameOverModal';
import { useRouter } from 'next/navigation';
import { animate, checkCollision } from '@/utils/gameUtils';
import { Platform } from '@/utils/types';
import { useGameReducer } from '@/hooks/useGameReducer';
import { handleTouch } from '@/utils/gameControls';
import {
    BUBBLE_FRAMES,
    COINBUBBLE_FRAMES,
    PLATFORM_HEIGHT,
    PLATFORM_WIDTH,
    PLAYER_HEIGHT,
    PLAYER_WIDTH,
} from '@/utils/constants';
import { removePlatform } from '@/utils/actions';

const Game: React.FC = () => {
    const { state, dispatch } = useGameReducer();
    const router = useRouter();
    const requestRef = useRef<number>();
    const timeoutRefs = useRef<Record<string, number>>({});

    const onCompleteRemovePlatform = useCallback(
        (platformId: string) => {
            if (timeoutRefs.current[platformId]) {
                clearTimeout(timeoutRefs.current[platformId]);
            }
            timeoutRefs.current[platformId] = window.setTimeout(() => {
                removePlatform(dispatch, platformId);
                delete timeoutRefs.current[platformId];
            }, 10);
        },
        [dispatch]
    );

    useEffect(() => {
        const touchHandler = (e: TouchEvent) => handleTouch(e, dispatch);

        window.addEventListener('touchmove', touchHandler);
        window.addEventListener('touchstart', touchHandler);
        window.addEventListener('touchend', touchHandler);
        return () => {
            window.removeEventListener('touchmove', touchHandler);
            window.removeEventListener('touchstart', touchHandler);
            window.removeEventListener('touchend', touchHandler);
        };
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            dispatch({ type: 'resize' });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [dispatch]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(() => animate(state, dispatch));

        state.gameOver && cancelAnimationFrame(requestRef.current!);
    }, [state, dispatch]);

    useEffect(() => {
        checkCollision(state, dispatch);
    }, [state, dispatch]);

    const handleModalClose = () => {
        router.push('/');
        dispatch({ type: 'gameOver', payload: { gameOver: false } });
    };

    return (
        <>
            <Stage
                width={state.dimensions.width}
                height={state.dimensions.height}
                options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
            >
                {
                    !state.gameOver && state.platforms.map((platform: Platform) => {
                        const adjustedX = Math.max(
                            platform.width / 2,
                            Math.min(window.innerWidth - platform.width / 2, platform.x)
                        );
                        const adjustedY = platform.y + state.cameraLift;

                        return (
                            <AnimatedSprite
                                key={platform.id}
                                isPlaying={platform.isPlaying}
                                x={adjustedX}
                                y={adjustedY}
                                images={platform.hasCoin ? COINBUBBLE_FRAMES : BUBBLE_FRAMES}
                                animationSpeed={0.40}
                                loop={false}
                                onComplete={() => onCompleteRemovePlatform(platform.id)}
                                width={PLATFORM_WIDTH}
                                height={PLATFORM_HEIGHT}
                                // onFrameChange={(sprite: any) => {
                                //   if (sprite.currentFrame === sprite.images?.length - 1) {
                                //     removePlatform(dispatch, platform.id);
                                //   }
                                // }}
                                anchor={0.5}
                            />
                        );
                    })
                }

                {!state.gameOver && (
                    <Sprite
                        x={state.playerX}
                        y={state.playerY}
                        image="/star320.png"
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
