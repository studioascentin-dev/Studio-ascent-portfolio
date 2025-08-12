
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight, Dribbble, Instagram, Linkedin } from 'lucide-react';

export function HeroSection() {
 
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-y-0 right-0 w-1/2 xl:w-7/12 h-full z-0">
          <Image 
              src="https://placehold.co/800x1200.png"
              alt="Dev Kumar Das Hero Image"
              fill
              className="object-cover object-center"
              data-ai-hint="developer portrait stylized"
              priority
          />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content Column */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative text-left space-y-8"
            >
                <div className='absolute -top-32 left-0 text-primary font-bold text-6xl font-headline'>D</div>
                <div>
                  <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tight text-foreground leading-tight">
                      <span>Dev Kumar</span>
                      <br/>
                      <span>Das.</span>
                  </h1>
                  <div className="w-16 h-1 bg-primary mt-4"></div>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Dribbble size={20} /></a>
                  <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                </div>
            </motion.div>

            {/* Right Content Column */}
            <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 className="space-y-6"
            >
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-2">— INTRODUCTION</p>
                <h2 className="text-3xl lg:text-4xl font-bold font-headline leading-tight">
                  Full-Stack Developer &<br/>Creative Designer, based in India.
                </h2>
              </div>
                <p className="max-w-md text-muted-foreground leading-relaxed">
                   I design and code beautifully simple things, and I love what I do. Just simple like that!
                </p>
                <Button asChild variant="link" size="lg" className="font-bold text-primary p-0 text-base group">
                    <a href="#about">
                        My story
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                    </a>
                </Button>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
