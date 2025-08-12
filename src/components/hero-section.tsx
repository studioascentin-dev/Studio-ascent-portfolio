
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Dribbble, Instagram, Linkedin, Code, PenTool, Camera, Video, Presentation } from 'lucide-react';

export function HeroSection() {
 
  const iconVariants = (duration: number, delay: number) => ({
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      },
    },
  });

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 text-primary/10 filter blur-sm">
          <motion.div variants={iconVariants(3, 0.5)} initial="initial" animate="animate" className="absolute top-20 left-10">
              <Code className="h-24 w-24" strokeWidth={1} />
          </motion.div>
          <motion.div variants={iconVariants(4, 1)} initial="initial" animate="animate" className="absolute top-1/2 left-1/4 -translate-y-1/2">
              <PenTool className="h-20 w-20" strokeWidth={1} />
          </motion.div>
          <motion.div variants={iconVariants(3.5, 0)} initial="initial" animate="animate" className="absolute bottom-24 right-20">
              <Camera className="h-28 w-28" strokeWidth={1} />
          </motion.div>
          <motion.div variants={iconVariants(5, 1.5)} initial="initial" animate="animate" className="absolute bottom-1/3 right-1/2">
              <Video className="h-16 w-16" strokeWidth={1} />
          </motion.div>
              <motion.div variants={iconVariants(4.2, 0.8)} initial="initial" animate="animate" className="absolute top-10 right-10">
              <Presentation className="h-20 w-20" strokeWidth={1} />
          </motion.div>
          <motion.div variants={iconVariants(3.8, 1.8)} initial="initial" animate="animate" className="absolute bottom-10 left-20">
              <Code className="h-16 w-16" strokeWidth={1} />
          </motion.div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="relative space-y-8 inline-block">
                    <div className='absolute -top-16 -left-4 text-primary font-bold text-8xl font-headline opacity-50'>D</div>
                    <div>
                        <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tight text-foreground leading-tight">
                            <span>Dev Kumar</span>
                            <br/>
                            <span>Das.</span>
                        </h1>
                        <div className="w-16 h-1 bg-primary mt-4 mx-auto"></div>
                    </div>
                    <div className="flex space-x-4 justify-center">
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Dribbble size={20} /></a>
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-foreground/80 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="space-y-6 mt-8"
                >
                    <div>
                        <p className="text-sm text-muted-foreground font-medium mb-2">— INTRODUCTION</p>
                        <h2 className="text-3xl lg:text-4xl font-bold font-headline leading-tight">
                        Full-Stack Developer &<br/>Creative Designer, based in India.
                        </h2>
                    </div>
                    <p className="max-w-md text-muted-foreground leading-relaxed mx-auto">
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
          </div>
        </div>
    </section>
  );
}
