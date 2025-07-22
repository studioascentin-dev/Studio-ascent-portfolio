"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter text-foreground">
        HI, I'M <span className="text-primary">DEV</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed mt-12">
        A CREATIVE DEVELOPER & DESIGNER
        <br />
        PASSIONATE ABOUT CRAFTING BOLD AND
        <br />
        MEMORABLE PROJECTS
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring' }}
       className="mt-8">
        <Button asChild className="font-bold text-lg py-6 px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
          <a href="#about-me">About Me</a>
        </Button>
      </motion.div>
    </section>
  );
}
