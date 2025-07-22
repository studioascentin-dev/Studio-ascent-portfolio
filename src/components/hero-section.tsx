"use client";

export function HeroSection() {
  return (
    <section id="about" className="relative w-full h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden">
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="max-w-3xl text-2xl md:text-4xl lg:text-5xl text-foreground/80 font-light tracking-wider leading-relaxed">
            A CREATIVE DEVELOPER & DESIGNER
            <br />
            PASSIONATE ABOUT CRAFTING BOLD AND
            <br />
            MEMORABLE PROJECTS
          </p>
        </div>
      </div>
    </section>
  );
}
