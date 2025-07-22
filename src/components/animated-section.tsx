"use client";

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      duration: 0.8
    }
  },
};

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(ref, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(className)}
      variants={sectionVariants}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}
