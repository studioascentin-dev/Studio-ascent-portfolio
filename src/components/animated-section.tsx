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
  const isOnScreen = useOnScreen(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isOnScreen ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
