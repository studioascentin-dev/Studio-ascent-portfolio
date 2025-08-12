
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Image from 'next/image';
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
    <section id="home" className="relative w-full flex flex-col items-center justify-center min-h-screen overflow-hidden">
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

      <div className="container mx-auto px-4 z-10 flex items-center">
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
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

            <div className="hidden md:flex justify-end items-center">
                 <motion.div 
                    className="relative w-[500px] h-[600px] z-10"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  >
                    <Image
                        src="/images/profileicon.png"
                        alt="Dev Kumar Das Hero Image"
                        fill
                        className="object-contain"
                        style={{ filter: 'drop-shadow(0px 30px 15px rgba(0,0,0,0.3))' }}
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
