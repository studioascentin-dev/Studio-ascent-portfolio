
"use client";

import { motion } from 'framer-motion';
import { Award, MessageSquare, Target, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ContactFormWrapper } from './contact-form-wrapper';
import { cn } from '@/lib/utils';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const hiringPoints = [
    {
        icon: <Award className="w-6 h-6 text-primary" />,
        title: "Quality & Experience",
        description: "I deliver high-quality, professional results that align with the latest industry standards."
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-primary" />,
        title: "Client-Centric Approach",
        description: "I prioritize clear communication to ensure the final product perfectly aligns with your vision and goals."
    },
    {
        icon: <Target className="w-6 h-6 text-primary" />,
        title: "Passion for Creativity",
        description: "I bring a creative, solution-oriented mindset to every project, crafting unique and impactful digital experiences."
    }
];

export function HireMeSection() {
    
    return (
        <section id="contact" className="py-24 md:py-32">
            <motion.div
                className="container mx-auto px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter"
                    >
                        Let's Work <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-primary animate-shimmer bg-[length:200%_auto]">Together</span>
                    </motion.h2>
                     <motion.p 
                        variants={itemVariants} 
                        className="mt-4 text-muted-foreground md:text-lg"
                    >
                        Have a project in mind? Fill out the form below and I'll get back to you soon!
                    </motion.p>
                </div>
                
                <motion.div 
                    variants={itemVariants} 
                    className="mt-12 md:mt-16 max-w-3xl mx-auto"
                >
                    <div className={cn(
                        "relative p-6 rounded-lg mb-8 text-center border overflow-hidden",
                        "dark:bg-secondary/40 light:bg-gray-800 light:text-white"
                    )}>
                         <div className={cn(
                            "absolute -inset-[1px] rounded-lg z-0",
                            "dark:bg-gradient-to-br dark:from-primary/20 dark:via-transparent dark:to-blue-500/20",
                            "light:bg-gradient-to-br light:from-gray-900 light:to-gray-700",
                            "opacity-100"
                        )} />
                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <Clock className="w-5 h-5 text-primary" />
                                <h4 className={cn(
                                    "font-headline text-lg font-semibold",
                                    "dark:text-foreground light:text-white"
                                )}>Opening Hours</h4>
                            </div>
                            <p className={cn(
                                "text-sm",
                                "dark:text-muted-foreground light:text-gray-300"
                            )}>Mon - Sat: 8:00 AM to 9:00 PM</p>
                            <p className={cn(
                                "text-sm",
                                "dark:text-muted-foreground light:text-gray-300"
                            )}>Sunday: 10:00 AM to 6:00 PM</p>
                            <p className="text-primary text-xs mt-2 font-medium">For a faster reply, please message during opening hours.</p>
                        </div>
                    </div>
                    <ContactFormWrapper />
                </motion.div>

            </motion.div>
        </section>
    );
}
