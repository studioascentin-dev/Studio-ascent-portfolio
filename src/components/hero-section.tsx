
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const roles = ["A FULL-STACK DEVELOPER", "A CREATIVE DESIGNER", "A VIDEO EDITOR", "A PHOTO EDITOR"];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const DELAY_AFTER_TYPING = 1800;

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        if (text.length > 0) {
          setText((prev) => prev.substring(0, prev.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      } else {
        if (text.length < currentRole.length) {
          setText((prev) => currentRole.substring(0, prev.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground leading-tight">
                    <span>I'm Dev Kumar Das</span>
                    <br/>
                    <span className="text-primary font-headline">
                      <span>{text}</span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                        className="inline-block w-1 h-[0.8em] bg-primary ml-2 translate-y-1"
                      />
                    </span>
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground font-light tracking-wide leading-relaxed mt-6">
                    Pixel-perfect designs and powerful code. Let's build something unforgettable together.
                </p>
                <Button asChild variant="link" size="lg" className="font-bold text-primary mt-8 px-0 text-lg group">
                    <a href="#about">
                        My Story
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </Button>
            </motion.div>
            <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 className="hidden md:block"
            >
                <Image 
                    src="https://placehold.co/600x600.png"
                    alt="Dev Kumar Das Hero Image"
                    width={600}
                    height={600}
                    className="rounded-full shadow-lg border-4 border-primary/20"
                    data-ai-hint="developer portrait stylized"
                />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
