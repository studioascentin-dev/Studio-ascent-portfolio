"use client";

import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
              HI, I'M <span className="text-primary">DEV</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed mt-12">
              A CREATIVE DEVELOPER & DESIGNER
              <br />
              PASSIONATE ABOUT CRAFTING BOLD AND
              <br />
              MEMORABLE PROJECTS
            </p>
            <Button variant="link" asChild className="mt-8 text-lg uppercase tracking-widest px-0 text-foreground hover:text-primary">
              <a href="#about-me">About Me</a>
            </Button>
        </div>
    </AnimatedSection>
  );
}
