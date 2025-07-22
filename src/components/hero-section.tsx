"use client";

import { useState, useEffect } from 'react';
import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const roles = ["DEV", "A VIDEO EDITOR", "A WEB DEVELOPER", "A DESIGNER", "A PHOTO EDITOR"];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsAnimating(false);
      }, 500); // Corresponds to animation duration
    }, 2500); // Time each role is displayed

    return () => clearInterval(interval);
  }, []);


  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl md:text-9xl lg:text-[8rem] font-extrabold font-headline tracking-tighter text-foreground leading-none flex items-center justify-center">
              HI, I'M&nbsp;
              <span className="text-primary relative overflow-hidden h-[1.2em] flex-shrink-0" style={{width: '10ch'}}>
                <span
                  className={cn(
                    "absolute inset-0 transition-transform duration-500 ease-in-out",
                    isAnimating ? '-translate-y-full' : 'translate-y-0'
                  )}
                  key={currentIndex}
                >
                  {roles[currentIndex]}
                </span>
                <span
                  className={cn(
                    "absolute inset-0 transition-transform duration-500 ease-in-out",
                    isAnimating ? 'translate-y-0' : 'translate-y-full'
                  )}
                  key={currentIndex + 1}
                >
                  {roles[(currentIndex + 1) % roles.length]}
                </span>
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed mt-12">
              A CREATIVE DEVELOPER & DESIGNER
              <br />
              PASSIONATE ABOUT CRAFTING BOLD AND
              <br />
              MEMORABLE PROJECTS
            </p>
            <div className="mt-12">
              <Button asChild className="font-bold text-lg py-6 px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                <a href="#contact">About Me</a>
              </Button>
            </div>
        </div>
    </AnimatedSection>
  );
}
