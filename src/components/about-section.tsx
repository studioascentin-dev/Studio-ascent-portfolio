
"use client";

import { useState, useRef, RefObject } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, MapPin, BookOpen, Code, Target, Heart, ChevronDown, KeyRound } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { cn } from '@/lib/utils';

const aboutDetails = [
    { icon: <User className="h-8 w-8 text-primary" />, title: "Full Name", value: "Dev Kumar Das", details: "This is the name my parents gave me. You can call me Dev." },
    { icon: <MapPin className="h-8 w-8 text-primary" />, title: "From", value: "[Your City, Your Country]", details: "I've been living here for my entire life and love the culture and people." },
    { icon: <BookOpen className="h-8 w-8 text-primary" />, title: "Studies", value: "[Your Degree or Field of Study]", details: "My studies have provided me with a strong foundation in both theoretical concepts and practical applications." },
    { icon: <Code className="h-8 w-8 text-primary" />, title: "Websites I've Built", value: "[List a few projects or types of sites]", details: "I enjoy building a diverse range of websites, from sleek portfolios to complex e-commerce platforms." },
    { icon: <Heart className="h-8 w-8 text-primary" />, title: "Hobbies", value: "[Your Hobbies]", details: "When I'm not coding, I enjoy... It's a great way to unwind and recharge my creativity." },
    { icon: <Target className="h-8 w-8 text-primary" />, title: "Ambition", value: "[Your professional ambition or goal]", details: "My long-term goal is to leverage my skills to build innovative solutions that make a meaningful impact." },
];

export function AboutSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [unlockedIndices, setUnlockedIndices] = useState<Set<number>>(new Set());
    const dragControls = useDragControls();
    const constraintsRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleDrop = (index: number) => {
        setUnlockedIndices(prev => new Set(prev).add(index));
    };

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
        <section id="about-me" className="py-16 md:py-24 lg:py-32 overflow-hidden" ref={constraintsRef}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8">
                    <div className="text-center relative">
                         <motion.div 
                            drag 
                            dragControls={dragControls}
                            dragElastic={0.2}
                            onDragEnd={(_event, info) => {
                                const { point } = info;
                                cardRefs.current.forEach((cardRef, index) => {
                                    if (cardRef) {
                                        const rect = cardRef.getBoundingClientRect();
                                        if (
                                            point.x >= rect.left &&
                                            point.x <= rect.right &&
                                            point.y >= rect.top &&
                                            point.y <= rect.bottom
                                        ) {
                                            handleDrop(index);
                                        }
                                    }
                                });
                            }}
                            whileDrag={{ scale: 1.2, rotate: -15, zIndex: 50 }}
                            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-24 lg:right-48 cursor-grab"
                         >
                             <KeyRound className="h-10 w-10 text-primary-foreground/50 hover:text-primary-foreground transition-colors" />
                         </motion.div>
                        <motion.h2 
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">About Me</motion.h2>
                        <motion.p 
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-4 text-muted-foreground md:text-xl max-w-2xl mx-auto">Drag the key to unlock each section and learn more about me.</motion.p>
                    </div>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>
                        
                        {aboutDetails.map((detail, index) => {
                             const isUnlocked = unlockedIndices.has(index);
                            return (
                                <div
                                    key={detail.title}
                                    ref={el => cardRefs.current[index] = el}
                                    className={cn(
                                        "relative flex items-center mb-12",
                                        index % 2 === 0 ? "justify-start" : "justify-end"
                                    )}
                                >
                                    <div className={cn("absolute left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background")}></div>
                                    
                                    <motion.div 
                                        className={cn("w-5/12", index % 2 === 0 ? "pr-8" : "pl-8")}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        animate={{
                                            filter: isUnlocked ? 'blur(0px)' : 'blur(4px)',
                                            scale: isUnlocked ? 1 : 0.95,
                                        }}
                                    >
                                        <Card
                                            className={cn(
                                                "bg-card/80 backdrop-blur-sm shadow-lg transition-all duration-300 w-full",
                                                { "cursor-pointer hover:shadow-primary/20": isUnlocked },
                                                { "ring-2 ring-primary": expandedIndex === index }
                                            )}
                                            onClick={() => isUnlocked && setExpandedIndex(expandedIndex === index ? null : index)}
                                        >
                                            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
                                                <div className="flex flex-col items-start gap-2">
                                                    {detail.icon}
                                                    <CardTitle className="text-xl font-headline">{detail.title}</CardTitle>
                                                </div>
                                                {isUnlocked && (
                                                    <motion.div
                                                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                    </motion.div>
                                                )}
                                            </CardHeader>
                                            <CardContent>
                                                <motion.p layout className="text-muted-foreground">{detail.value}</motion.p>
                                                <AnimatePresence>
                                                    {expandedIndex === index && isUnlocked && (
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
