
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingScreen } from './loading-screen';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Hide loading screen on initial load
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleRouteChangeStart = () => {
      timer = setTimeout(() => {
        setIsLoading(true);
      }, 200); // Only show loading screen for navigations that take longer than 200ms
    };

    const handleRouteChangeComplete = () => {
      clearTimeout(timer);
      setIsLoading(false);
    };

    // This is a simplified simulation, for a real app, you would use Next.js router events
    // For this environment, we'll use the pathname change to simulate it.
    
    // Simulate start
    handleRouteChangeStart();

    // Simulate end after a delay (e.g. 1s) to show the loading screen
    const endTimer = setTimeout(() => {
        handleRouteChangeComplete();
    }, 1000);


    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [pathname]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </>
  );
}
