
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Briefcase, MapPin } from 'lucide-react';

export function AboutSection() {
    
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

    const info = [
        {
            icon: <User className="w-8 h-8 text-primary" />,
            title: "About Me",
            description: "A passionate developer who loves creating beautiful and functional web experiences."
        },
        {
            icon: <Briefcase className="w-8 h-8 text-primary" />,
            title: "Profession",
            description: "Junior Full-Stack Developer skilled in React, Next.js, and modern web technologies."
        },
        {
            icon: <MapPin className="w-8 h-8 text-primary" />,
            title: "Based In",
            description: "Sonapur, Assam, India"
        }
    ]

    return (
        <section className="py-24 md:py-32 bg-secondary/50">
            <motion.div 
                className="container mx-auto px-4"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-5xl md:text-6xl font-bold font-headline text-center mb-16"
                >
                    About <span className="text-primary">Me</span>
                </motion.h2>

                <motion.div
                    variants={sectionVariants} 
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {info.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="bg-card/80 p-6 text-center h-full hover:-translate-y-2 transition-all duration-300 hover:bg-secondary">
                                <CardHeader className="p-0 items-center mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
                                        {item.icon}
                                    </div>
                                    <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-muted-foreground">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-center mt-16">
                     <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                        My expertise lies in crafting dynamic, engaging interfaces through writing clean and optimized code and utilizing cutting-edge development tools and techniques. I am also a team player who thrives in collaborating with cross-functional teams to produce outstanding web applications.
                    </p>
                    <Button asChild size="lg" className="font-bold">
                        <a href="#contact">Hire Me</a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
