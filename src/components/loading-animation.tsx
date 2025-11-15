
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import LogoImage from '../../public/images/My Logo.png';

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div layoutId="logo">
        <div className="relative h-16 w-16">
          <Image 
            src={LogoImage} 
            alt="Studio Ascent Logo" 
            fill
            sizes="64px"
            className="rounded-full object-cover"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
