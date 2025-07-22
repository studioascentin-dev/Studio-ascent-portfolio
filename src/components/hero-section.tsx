
"use client";

import Image from 'next/image';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section id="about" className="relative w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-headline tracking-tighter text-foreground">
              HI, I'M DEV
            </h1>
            <p className="mt-4 max-w-md text-lg md:text-xl text-muted-foreground">
              A CREATIVE DEVELOPER & DESIGNER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS
            </p>
            <Button
              size="lg"
              className="mt-8 px-10 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-primary via-accent to-pink-500 text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
            >
              CONTACT ME »
            </Button>
          </div>
          <div className="relative flex items-center justify-center h-full">
            <Image
              src="https://placehold.co/800x800.png"
              alt="3D Character"
              width={800}
              height={800}
              className="w-full h-auto max-w-md md:max-w-full"
              data-ai-hint="3d character"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
