"use client";

import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-extrabold font-headline tracking-tighter text-foreground leading-none">
              HI, I'M <span className="text-primary">DEV</span>
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
