
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Dribbble, Instagram, Linkedin, Code, PenTool, Camera, Video, Presentation } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: '4rem', // w-16
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.8,
    },
  },
};

const socialIconVariants = {
  rest: { y: 0 },
  hover: { y: -4 },
};


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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 z-10"
      >
        <div className="flex flex-col justify-center text-center">
          <div className="relative space-y-8 inline-block">
            <motion.div variants={itemVariants} className='absolute -top-24 -left-12 md:-top-16 md:-left-4 opacity-50'>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-primary h-auto w-[80px] md:w-[100px]">
                <path d="M80 0H20C8.95431 0 0 8.95431 0 20V80C0 91.0457 8.95431 100 20 100H80C91.0457 100 100 91.0457 100 80V20C100 8.95431 91.0457 0 80 0ZM80 80H20V20H80V80Z" fill="none" stroke="currentColor" strokeWidth="20" />
                <path d="M80 20C80 8.95431 71.0457 0 60 0H40C28.9543 0 20 8.95431 20 20V80C20 91.0457 28.9543 100 40 100H60C71.0457 100 80 91.0457 80 80V20Z" fill="currentColor" />
                <path d="M60,20 C71.045695,20 80,28.954305 80,40 L80,60 C80,71.045695 71.045695,80 60,80 L40,80 C28.954305,80 20,71.045695 20,60 L20,40 C20,28.954305 28.954305,20 40,20 L60,20 Z M60,0 C82.09139,0 100,17.90861 100,40 L100,60 C100,82.09139 82.09139,100 60,100 L40,100 C17.90861,100 0,82.09139 0,60 L0,40 C0,17.90861 17.90861,0 40,0 L60,0 Z" />
              </svg>
            </motion.div>
            <div>
                <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tight text-foreground leading-tight">
                    <motion.span variants={itemVariants} className="block">Dev Kumar</motion.span>
                    <motion.span variants={itemVariants} className="block">Das.</motion.span>
                </h1>
                <motion.div variants={lineVariants} className="h-1 bg-primary mt-4 mx-auto"></motion.div>
            </div>
            <motion.div variants={itemVariants} className="flex space-x-4 justify-center">
              <motion.a href="#" variants={socialIconVariants} whileHover="hover" initial="rest" className="text-foreground/80 hover:text-primary transition-colors"><Dribbble size={20} /></motion.a>
              <motion.a href="#" variants={socialIconVariants} whileHover="hover" initial="rest" className="text-foreground/80 hover:text-primary transition-colors"><Instagram size={20} /></motion.a>
              <motion.a href="#" variants={socialIconVariants} whileHover="hover" initial="rest" className="text-foreground/80 hover:text-primary transition-colors"><Linkedin size={20} /></motion.a>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            className="space-y-6 mt-8"
          >
            <div>
              <motion.p variants={itemVariants} className="text-sm text-muted-foreground font-medium mb-2">— INTRODUCTION</motion.p>
              <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold font-headline leading-tight">
              Full-Stack Developer &<br/>Creative Designer, based in India.
              </motion.h2>
            </div>
            <motion.p variants={itemVariants} className="max-w-md text-muted-foreground leading-relaxed mx-auto">
            I design and code beautifully simple things, and I love what I do. Just simple like that!
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button asChild variant="link" size="lg" className="font-bold text-primary p-0 text-base group">
                  <a href="#about">
                      My story
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                  </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
