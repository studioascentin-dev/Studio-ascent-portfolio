"use client";

import { useState, useEffect, useRef } from 'react';
import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

const roles = ["DEV", "A VIDEO EDITOR", "A WEB DEVELOPER", "A DESIGNER", "A PHOTO EDITOR"];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);
  const roleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (roleRefs.current[currentIndex]) {
      setCurrentWidth(roleRefs.current[currentIndex]!.offsetWidth);
    }
  }, [currentIndex]);
  
  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16">
      <div 
        className="flex items-baseline justify-center transition-all duration-500 ease-in-out"
      >
        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter text-foreground whitespace-nowrap">
          HI, I'M&nbsp;
        </h1>
        <div 
          className="relative text-primary text-left transition-all duration-500 ease-in-out" 
          style={{ width: currentWidth }}
        >
          <div
            className="h-[1.2em] overflow-hidden"
          >
            <div
              className="transition-transform duration-700 ease-in-out"
              style={{ transform: `translateY(-${currentIndex * 1.2}em)` }}
            >
              {roles.map((role, index) => (
                <div key={index} className="h-[1.2em] leading-none">
                  <span 
                    ref={(el) => (roleRefs.current[index] = el)} 
                    className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter whitespace-nowrap"
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </AnimatedSection>
  );
}
