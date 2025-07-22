
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingScreen } from './loading-screen';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs on route changes.
    // We set loading to true, then false after a short delay to allow the animation to play.
    setIsLoading(true);
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1000); // Duration of the loading screen

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        {children}
      </div>
    </>
  );
}
