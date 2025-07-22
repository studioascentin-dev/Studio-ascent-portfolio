
"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
