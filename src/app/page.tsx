'use client';
import React, { useState, useEffect } from 'react';
import checkIsMobileDevice from '../utils/isMobileDevice';
import HomeScreen from './components/HomeScreen/HomeScreen';
import NotMobile from './components/NotMobile/NotMobile';
import LoadingSpinner from './components/Loading/Loading';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useViewportHeight();

  useEffect(() => {
    const isUsingMobile = () => {
      setIsMobile(checkIsMobileDevice());
      setIsInitialized(true);
    };

    isUsingMobile();

    window.addEventListener('resize', isUsingMobile);

    return () => {
      window.removeEventListener('resize', isUsingMobile);
    };
  }, []);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <main>{isMobile ? <HomeScreen /> : <NotMobile />}</main>;
}
