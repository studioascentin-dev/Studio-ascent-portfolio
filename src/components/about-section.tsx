"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { User, MapPin, BookOpen, Code, Target, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const aboutDetails = [
    { icon: <User className="h-6 w-6 text-primary" />, title: "Full Name", value: "Dev Kumar Das" },
    { icon: <MapPin className="h-6 w-6 text-primary" />, title: "From", value: "[Your City, Your Country]" },
    { icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Studies", value: "[Your Degree or Field of Study]" },
    { icon: <Code className="h-6 w-6 text-primary" />, title: "Websites I've Built", value: "[List a few projects or types of sites]" },
    { icon: <Heart className="h-6 w-6 text-primary" />, title: "Hobbies", value: "[Your Hobbies]" },
    { icon: <Target className="h-6 w-6 text-primary" />, title: "Ambition", value: "[Your professional ambition or goal]" },
];

export function AboutSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const cardVariants = {
        initial: {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
        },
        hovered: {
            scale: 1.05,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
        },
        blurred: {
            filter: 'blur(4px)',
            opacity: 0.5,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatedSection id="about-me" className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                        <p className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">A little bit about my journey and passions.</p>
                    </div>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {aboutDetails.map((detail, index) => (
                            <motion.div
                                key={detail.title}
                                onHoverStart={() => setHoveredIndex(index)}
                                variants={cardVariants}
                                animate={
                                    hoveredIndex === null
                                        ? 'initial'
                                        : hoveredIndex === index
                                        ? 'hovered'
                                        : 'blurred'
                                }
                            >
                                <Card className={cn(
                                    "bg-card/50 h-full transition-all duration-300",
                                    { "animated-gradient-border": hoveredIndex === index }
                                )}>
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        {detail.icon}
                                        <CardTitle className="text-lg font-headline">{detail.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{detail.value}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
