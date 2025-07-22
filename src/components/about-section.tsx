"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { User, MapPin, BookOpen, Code, Target, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const aboutDetails = [
    { icon: <User className="h-6 w-6 text-primary" />, title: "Full Name", value: "Dev Kumar Das", details: "This is the name my parents gave me. You can call me Dev." },
    { icon: <MapPin className="h-6 w-6 text-primary" />, title: "From", value: "[Your City, Your Country]", details: "I've been living here for my entire life and love the culture and people." },
    { icon: <BookOpen className="h-6 w-6 text-primary" />, title: "Studies", value: "[Your Degree or Field of Study]", details: "My studies have provided me with a strong foundation in both theoretical concepts and practical applications." },
    { icon: <Code className="h-6 w-6 text-primary" />, title: "Websites I've Built", value: "[List a few projects or types of sites]", details: "I enjoy building a diverse range of websites, from sleek portfolios to complex e-commerce platforms." },
    { icon: <Heart className="h-6 w-6 text-primary" />, title: "Hobbies", value: "[Your Hobbies]", details: "When I'm not coding, I enjoy... It's a great way to unwind and recharge my creativity." },
    { icon: <Target className="h-6 w-6 text-primary" />, title: "Ambition", value: "[Your professional ambition or goal]", details: "My long-term goal is to leverage my skills to build innovative solutions that make a meaningful impact." },
];

export function AboutSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                                layout
                            >
                                <Card
                                    className={cn(
                                        "bg-card/50 h-full transition-all duration-300 cursor-pointer",
                                        { "animated-gradient-border": hoveredIndex === index || expandedIndex === index }
                                    )}
                                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                                        <div className="flex flex-row items-center gap-4">
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
                                    <CardContent>
                                        <motion.p layout className="text-muted-foreground">{detail.value}</motion.p>
                                        <AnimatePresence>
                                            {expandedIndex === index && (
                                                <motion.div
                                                    variants={contentVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                    className="overflow-hidden"
                                                >
                                                    <p className="pt-4 text-muted-foreground/80">{detail.details}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
