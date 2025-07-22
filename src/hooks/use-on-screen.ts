
"use client";

import { useState, useEffect, type RefObject } from 'react';

export function useOnScreen(ref: RefObject<Element>, options?: IntersectionObserverInit): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    // If the ref is not provided, do nothing.
    if (!ref?.current) {
        setIntersecting(false);
        return;
    }
  
    const observer = new IntersectionObserver(([entry]) => {
      // Set state based on whether the element is intersecting or not.
      setIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isIntersecting;
}
