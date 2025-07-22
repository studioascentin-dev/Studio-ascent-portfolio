"use client";

import { Interactive3DModel } from './interactive-3d-model';

export function HeroSection() {
  return (
    <section id="about" className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute top-24 left-0 right-0 z-10 p-4">
        <p className="max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl text-foreground/80 font-light tracking-wider leading-relaxed">
          A CREATIVE DEVELOPER & DESIGNER
          <br />
          PASSIONATE ABOUT CRAFTING BOLD AND
          <br />
          MEMORABLE PROJECTS
        </p>
      </div>
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
        <Interactive3DModel />
      </div>
      <div className="relative z-10 p-4 flex items-center justify-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
          HI, I'M DEV
        </h1>
      </div>
    </section>
  );
}
