
"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <section
      ref={ref}
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
