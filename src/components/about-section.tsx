
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, BookOpen, Code, Target, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const aboutDetails = [
    { icon: <User className="h-8 w-8 text-primary" />, title: "Full Name", value: "Dev Kumar Das", details: "I'm 22 years old. This is the name my parents gave me. You can call me Dev." },
    { icon: <MapPin className="h-8 w-8 text-primary" />, title: "From", value: "Sonapur, India", details: "I'm currently based here, but I enjoy working with people from all over the world. I am from a small town called Sonapur which is located in north-east part of India." },
    { icon: <BookOpen className="h-8 w-8 text-primary" />, title: "Studies", value: "K.V Digaru & Sonapur College", details: "I completed my schooling from K.V Digaru and completed my secondary and my bachelor's degree from Sonapur College in 2025." },
    { icon: <Heart className="h-8 w-8 text-primary" />, title: "Hobbies", value: "Travel & Eating new dishes", details: "I like to travel and enjoy visiting new places, although I don't have any money to do so 😂." },
    { icon: <Target className="h-8 w-8 text-primary" />, title: "Ambition", value: "To Build Impactful Websites", details: "My ambition is to became like Jeff Bezos by creating my own website which can change people life and make it more easier. Build new things is always my liking. I also still learning new things." },
];

export function AboutSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const contentVariants = {
        hidden: { opacity: 0, height: 0, y: -10 },
        visible: {
            opacity: 1,
            height: 'auto',
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };
    
    return (
        <section id="about-me" className="py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8">
                    <div className="text-center">
                        <motion.h2 
                            variants={textVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">About Me</motion.h2>
                        <motion.p 
                            variants={textVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">A little more about my journey, skills, and passions.</motion.p>
                    </div>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>
                        
                        {aboutDetails.map((detail, index) => (
                            <div
                                key={detail.title}
                                className={cn(
                                    "relative flex items-center mb-24",
                                    index % 2 === 0 ? "justify-start" : "justify-end"
                                )}
                            >
                                <div className={cn("absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background")}></div>
                                
                                <motion.div 
                                    className={cn("w-[48%]", index % 2 === 0 ? "pr-8" : "pl-8")}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card
                                        className={cn(
                                            "bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 w-full cursor-pointer hover:shadow-primary/20",
                                            { "ring-2 ring-primary": expandedIndex === index }
                                        )}
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                    >
                                        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
                                            <div className="flex flex-col items-start gap-2">
                                                {detail.icon}
                                                <CardTitle className="text-xl font-headline">{detail.title}</CardTitle>
                                            </div>
                                            <motion.div
                                                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            </motion.div>
                                        </CardHeader>
                                        <CardContent>
                                            <AnimatePresence>
                                                {expandedIndex === index && (
                                                    <motion.div
                                                        variants={contentVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="text-muted-foreground">{detail.value}</p>
                                                        <p className="pt-4 text-muted-foreground/80">{detail.details}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button asChild className="font-bold text-lg py-4 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                          <a href="/">Go Back</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
