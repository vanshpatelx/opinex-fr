
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Function to update window size
    function handleResize() {
      const width = window.innerWidth;
      setWindowSize({
        width: width,
        height: window.innerHeight,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away to update initial size
    handleResize();

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
