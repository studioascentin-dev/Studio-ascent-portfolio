"use client";

import { useState, useEffect } from 'react';
import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const roles = ["DEV", "A VIDEO EDITOR", "A WEB DEVELOPER", "A DESIGNER", "A PHOTO EDITOR"];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter text-foreground leading-none flex items-baseline">
                <span>HI, I'M</span>
                <div className="relative h-[1.2em] overflow-hidden ml-4 text-primary text-left">
                    <div
                        className="transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
                    >
                        {roles.map((role, index) => (
                            <div key={index} className="h-[1.2em] leading-none">
                                {role}
                            </div>
                        ))}
                    </div>
                </div>
            </h1>
        </div>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed mt-12">
          A CREATIVE DEVELOPER & DESIGNER
          <br />
          PASSIONATE ABOUT CRAFTING BOLD AND
          <br />
          MEMORABLE PROJECTS
        </p>
        <div className="mt-8">
          <Button asChild className="font-bold text-lg py-6 px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
            <a href="#about-me">About Me</a>
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}
