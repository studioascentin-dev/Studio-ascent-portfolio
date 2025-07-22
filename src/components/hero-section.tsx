"use client";

import { Interactive3DModel } from './interactive-3d-model';

export function HeroSection() {
  return (
    <section id="about" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Interactive3DModel />
      </div>
      <div className="relative z-10 p-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
          HI, I'M DEV
        </h1>
        <p className="mt-4 max-w-3xl text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed">
          A CREATIVE DEVELOPER & DESIGNER
          <br />
          PASSIONATE ABOUT CRAFTING BOLD AND
          <br />
          MEMORABLE PROJECTS
        </p>
      </div>
    </section>
  );
}
