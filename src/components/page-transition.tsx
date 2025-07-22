
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingScreen } from './loading-screen';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Hide loading screen after initial load/transition
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 500); // Adjust delay as needed for fade-out

    return () => clearTimeout(timer);
  }, [pathname]);
  
  useEffect(() => {
    // Reset loading state on path change to trigger for new pages
    setIsLoading(true);
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
