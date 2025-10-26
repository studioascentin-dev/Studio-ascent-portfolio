
"use client";

import { Video, Bot, Code, PenTool, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'video-editing',
    icon: <Video className="h-8 w-8 text-primary" />,
    title: 'Video Editing',
    description: 'Engaging edits for brands and creators.',
  },
  {
    id: 'ai-chatbot',
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Chatbot',
    description: 'Smart bots that grow your business.',
  },
  {
    id: 'web-development',
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Web Development',
    description: 'Modern, scalable, and fast websites.',
  },
  {
    id: 'something-else',
    icon: <PenTool className="h-8 w-8 text-primary" />,
    title: 'Something Else?',
    description: "Have an idea? Let's build it together.",
  },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};


export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
                <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter">
                    My <span className="text-primary">Services</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground text-base md:text-xl/relaxed mt-4 md:mt-6">
                    I provide a wide range of digital services to bring your vision to life.
                </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
                {services.map((service) => (
                    <motion.div key={service.id} variants={itemVariants} className="group">
                      <Link href={service.id === 'something-else' ? '#contact' : `/services/${service.id}`} className="block h-full">
                        <div className={cn(
                          "relative h-full p-6 text-center bg-secondary/40 rounded-lg overflow-hidden",
                          "transition-all duration-300 ease-in-out",
                          "hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20"
                        )}>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div 
                              className={cn(
                                "absolute -inset-[1px] rounded-lg z-0",
                                "bg-gradient-to-br from-primary/50 via-transparent to-blue-500/50",
                                "opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                              )}
                             />
                             <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                <div className="relative inline-block p-4 bg-background/50 rounded-full mb-4">
                                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-75"></div>
                                  <div className="relative">
                                    {service.icon}
                                  </div>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold font-headline text-foreground">{service.title}</h3>
                                <p className="text-muted-foreground text-sm md:text-base mt-2 flex-grow">{service.description}</p>
                                <div className="flex items-center text-sm font-semibold text-primary mt-6 group-hover:underline">
                                    Learn More
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                              </div>
                        </div>
                      </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
  );
}
