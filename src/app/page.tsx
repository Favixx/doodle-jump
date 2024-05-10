'use client';
import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen/HomeScreen';
import NotMobile from './components/NotMobile/NotMobile';
import LoadingSpinner from './components/Loading/Loading';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useDesktop } from '@/hooks/useDesktop';
import { GameProvider } from '@/contexts/gameContext';

export default function Home() {
    const isDesktop = useDesktop();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useViewportHeight();

    useEffect(() => {
        const load = () => {
            setIsInitialized(true);
        };

        load();

        //!why do you need this?
        // window.addEventListener('resize', load);

        // return () => {
        //     window.removeEventListener('resize', load);
        // };
    }, []);

    if (!isInitialized) {
        return <LoadingSpinner />;
    }

    return (
        <GameProvider>
            <main>{!isDesktop ? <HomeScreen /> : <NotMobile />}</main>
        </GameProvider>
    );
}
