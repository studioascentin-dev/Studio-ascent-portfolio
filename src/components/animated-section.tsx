"use client";

import { useRef, type ReactNode } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(ref, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-in-out',
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        className
      )}
    >
      {children}
    </section>
  );
}
