"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const roles = ["A DESIGNER", "A WEB DEVELOPER", "A VIDEO EDITOR", "A PHOTO EDITOR"];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const DELAY_AFTER_TYPING = 1500;

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        // Deleting text
        if (text.length > 0) {
          setText((prev) => prev.substring(0, prev.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        // Typing text
        if (text.length < currentRole.length) {
          setText((prev) => currentRole.substring(0, prev.length + 1));
        } else {
          // Pause and then start deleting
          setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter text-foreground -ml-16">
        HI, I'M&nbsp;
        <span className="inline-block text-left w-[15ch] text-primary">
          <span>{text}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="inline-block w-[2px] h-[1em] bg-primary ml-1 translate-y-1"
          ></motion.span>
        </span>
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
