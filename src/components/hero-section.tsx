
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight, Dribbble, Instagram, Linkedin } from 'lucide-react';

export function HeroSection() {
 
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left space-y-8"
            >
                <div className="relative space-y-8">
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
                </div>

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
            </motion.div>

            <div className="hidden md:flex justify-center items-center">
                 <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative w-[700px] h-[900px]"
                 >
                   <Image
                    src="/images/profileicon.png"
                    alt="Dev Kumar Das Hero Image"
                    className="object-contain z-10"
                    style={{ filter: 'drop-shadow(0px 30px 15px rgba(0,0,0,0.3))' }}
                    fill
                    priority
                  />
                 </motion.div>
            </div>
            <div className="md:hidden col-span-1 flex items-center justify-center">
                 <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative w-full max-w-sm h-96"
                 >
                    <Image 
                        src="/images/profileicon.png"
                        alt="Dev Kumar Das Hero Image"
                        fill
                        className="object-contain object-bottom"
                        style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.3))' }}
                        priority
                    />
                 </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
