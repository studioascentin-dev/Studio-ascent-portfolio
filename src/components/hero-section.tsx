"use client";

import { Button } from './ui/button';
import { Interactive3DModel } from './interactive-3d-model';

export function HeroSection() {
  return (
    <section id="about" className="relative w-full h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col gap-8 items-start">
          <div className="flex flex-col justify-center text-left">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
              HI, I'M<br />DEV
            </h1>
            <p className="mt-4 max-w-md text-lg md:text-xl text-muted-foreground">
              A CREATIVE DEVELOPER & DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
            </p>
            <Button
              size="lg"
              className="mt-8 px-10 py-6 text-lg font-bold rounded-full bg-transparent border-2 border-primary/50 text-primary-foreground shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-primary/20 active:scale-95 relative overflow-hidden group w-fit"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="relative z-10">
                CONTACT ME »
              </span>
            </Button>
          </div>
          <div className="relative flex items-center justify-center h-full min-h-[400px] md:min-h-[500px] w-full">
            <Interactive3DModel />
          </div>
        </div>
      </div>
    </section>
  );
}
