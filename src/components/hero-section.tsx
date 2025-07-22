"use client";

import { AnimatedSection } from './animated-section';
import { Button } from './ui/button';

const roles = ["DEV", "A VIDEO EDITOR", "A WEB DEVELOPER", "A DESIGNER", "A PHOTO EDITOR"];
const extendedRoles = [...roles, roles[0]]; // Add the first role to the end for a seamless loop

export function HeroSection() {
  return (
    <AnimatedSection id="hero" className="relative w-full h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="text-5xl md:text-7xl lg:text-[6rem] font-extrabold font-headline tracking-tighter text-foreground flex items-baseline justify-center whitespace-nowrap">
        <span className="mr-4">HI, I'M</span>
        <div className="inline-grid align-top text-primary h-[1.2em] overflow-hidden">
          <ul className="animate-scroll-up">
            {extendedRoles.map((role, index) => (
              <li key={index} className="h-[1.2em] leading-[1.2em]">
                {role}
              </li>
            ))}
          </ul>
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
