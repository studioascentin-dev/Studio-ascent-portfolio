
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
            icon: <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "About Me",
            description: "A passionate creator who loves bringing ideas to life through code and design."
        },
        {
            icon: <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "Profession",
            description: "A multi-talented creative specializing in Web & AI Development, Video/Photo Editing, and more."
        },
        {
            icon: <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
            title: "Based In",
            description: "Sonapur, Assam, India"
        }
    ]

    return (
        <section id="about" className="py-24 md:py-32">
            <motion.div 
                className="container mx-auto px-4"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-center mb-12 md:mb-16"
                >
                    About <span className="text-primary">Me</span>
                </motion.h2>

                <motion.div
                    variants={sectionVariants} 
                    className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
                >
                    {info.map((item, index) => (
                        <motion.div key={index} variants={itemVariants} className="group">
                            <Card className="bg-background/50 backdrop-blur-sm border p-6 text-center h-full hover:-translate-y-2 transition-all duration-300 hover:bg-primary/5 hover:border-primary">
                                <CardHeader className="p-0 items-center mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
                                        {item.icon}
                                    </div>
                                    <CardTitle className="font-headline text-xl md:text-2xl">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-center mt-12 md:mt-16">
                     <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto mb-8">
                        My expertise lies in crafting dynamic web applications, developing intelligent AI chatbots, and producing compelling visual content through video and photo editing. I thrive on collaborating with clients to bring their digital visions to life.
                    </p>
                    <Button asChild size="lg" className="font-bold">
                        <a href="#contact">Hire Me</a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
