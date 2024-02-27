import { useEffect } from 'react';

export const useViewportHeight = () => {
  useEffect(() => {
    const updateHeight = () => {
      // Перевірка, щоб уникнути помилки під час SSR.
      if (typeof window !== 'undefined') {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    window.addEventListener('resize', updateHeight);
    updateHeight(); // Викликати при ініціалізації

    return () => window.removeEventListener('resize', updateHeight);
  }, []);
};
