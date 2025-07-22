
"use client";

import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' } }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } }}
            className="text-6xl font-bold font-headline text-primary"
          >
            <motion.span
              initial={{ y: "0%" }}
              animate={{ y: ["0%", "-10%", "0%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              SA
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
