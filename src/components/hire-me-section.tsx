
"use client";

import { motion } from 'framer-motion';
import { Award, MessageSquare, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

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
        icon: <Award className="w-6 h-6 text-card-foreground group-hover:text-primary-foreground transition-colors duration-300" />,
        title: "Quality & Experience",
        description: "I deliver high-quality, professional results that align with the latest industry standards."
    },
    {
        icon: <MessageSquare className="w-6 h-6 text-card-foreground group-hover:text-primary-foreground transition-colors duration-300" />,
        title: "Client-Centric Approach",
        description: "I prioritize clear communication to ensure the final product perfectly aligns with your vision and goals."
    },
    {
        icon: <Target className="w-6 h-6 text-card-foreground group-hover:text-primary-foreground transition-colors duration-300" />,
        title: "Passion for Creativity",
        description: "I bring a creative, solution-oriented mindset to every project, crafting unique and impactful digital experiences."
    }
];

export function HireMeSection() {
    const phoneNumber = "919707191619";

    const handleWhatsAppClick = () => {
        const message = "Hello! I saw your portfolio and I'm interested in your services. Let's discuss a project.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <section id="contact" className="py-24 md:py-32 bg-secondary/50">
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
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl"
                    >
                        Why <span className="text-primary">Hire Me?</span>
                    </motion.h2>
                </div>
                
                <motion.div 
                    variants={sectionVariants} 
                    className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                >
                    {hiringPoints.map((point, index) => (
                        <motion.div key={index} variants={itemVariants} className="group">
                             <Card className="bg-card/80 p-6 text-center h-full hover:-translate-y-2 transition-all duration-300 hover:bg-primary group-hover:text-primary-foreground">
                                <CardHeader className="p-0 items-center mb-4">
                                    <div className="p-3 bg-card-foreground/10 rounded-full mb-4 inline-block group-hover:bg-primary-foreground/20 transition-colors duration-300">
                                        {point.icon}
                                    </div>
                                    <CardTitle className="font-headline text-xl">{point.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-muted-foreground text-sm group-hover:text-primary-foreground/90 transition-colors duration-300">{point.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

            </motion.div>
        </section>
    );
}
