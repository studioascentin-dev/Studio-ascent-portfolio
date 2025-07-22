"use client";

import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="absolute top-0 left-0 right-0 pt-20">
             <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed">
              A CREATIVE DEVELOPER & DESIGNER
              <br />
              PASSIONATE ABOUT CRAFTING BOLD AND
              <br />
              MEMORABLE PROJECTS
            </p>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
              HI, I'M <span className="text-primary">DEV</span>
            </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pb-20">
            <Button asChild className="font-bold text-lg py-6 px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
              <a href="#about-me">About Me</a>
            </Button>
        </div>
    </AnimatedSection>
  );
}
