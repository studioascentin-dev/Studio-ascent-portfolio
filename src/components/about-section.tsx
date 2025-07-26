
"use client";

import { useState } from 'react';
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

const MAX_VISIBLE_ITEMS = 2;

export function AboutSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    const visibleDetails = showAll ? aboutDetails : aboutDetails.slice(0, MAX_VISIBLE_ITEMS);

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
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                        
                        <AnimatePresence>
                            {visibleDetails.map((detail, index) => (
                                <motion.div
                                    key={detail.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, type: 'spring' }}
                                    className={cn(
                                        "relative flex items-center mb-12",
                                        index % 2 === 0 ? "justify-start" : "justify-end"
                                    )}
                                >
                                    <div className={cn("absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background")}></div>
                                    
                                    <div 
                                        className={cn("w-[calc(50%-2rem)]", index % 2 === 0 ? "pr-0" : "pl-0")}
                                    >
                                        <Card
                                            className={cn(
                                                "bg-secondary/80 backdrop-blur-sm shadow-lg transition-all duration-300 w-full cursor-pointer hover:shadow-primary/20",
                                                { "ring-2 ring-primary": expandedIndex === index }
                                            )}
                                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        >
                                            <CardHeader className="flex flex-row items-center justify-between gap-4 p-4">
                                                <div className="flex items-center gap-4">
                                                    {detail.icon}
                                                    <CardTitle className="text-lg font-headline">{detail.title}</CardTitle>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                </motion.div>
                                            </CardHeader>
                                            <AnimatePresence>
                                                {expandedIndex === index && (
                                                    <motion.div
                                                        variants={contentVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="hidden"
                                                        className="overflow-hidden"
                                                    >
                                                        <CardContent className="p-4 pt-0">
                                                            <p className="text-muted-foreground">{detail.value}</p>
                                                            <p className="pt-2 text-muted-foreground/80 text-sm">{detail.details}</p>
                                                        </CardContent>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Card>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {!showAll && (
                        <div className="text-center">
                            <Button variant="outline" onClick={() => setShowAll(true)}>See More</Button>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Button asChild size="lg">
                          <a href="/">Go Back</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
