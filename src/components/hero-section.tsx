"use client";

import { AnimatedSection } from './animated-section';

export function HeroSection() {
  return (
    <AnimatedSection id="hero" className="relative w-full h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="flex-grow flex items-end">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
              HI, I'M <span className="text-primary">DEV</span>
            </h1>
        </div>
        <div className="flex-grow flex items-start pt-8">
            <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed">
              A CREATIVE DEVELOPER & DESIGNER
              <br />
              PASSIONATE ABOUT CRAFTING BOLD AND
              <br />
              MEMORABLE PROJECTS
            </p>
        </div>
    </AnimatedSection>
  );
}
