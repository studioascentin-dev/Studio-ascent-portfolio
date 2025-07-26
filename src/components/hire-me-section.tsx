
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Mail, Phone, Gem, Code, HeartHandshake } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

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

const reasonsToHire = [
    {
        icon: <Gem className="h-10 w-10 text-primary" />,
        title: "Pixel-Perfect Design",
        description: "I bring your vision to life with meticulous attention to detail, ensuring every element is perfectly placed and visually stunning."
    },
    {
        icon: <Code className="h-10 w-10 text-primary" />,
        title: "High-Quality Code",
        description: "I write clean, efficient, and scalable code using modern technologies, resulting in fast, reliable, and maintainable websites."
    },
    {
        icon: <HeartHandshake className="h-10 w-10 text-primary" />,
        title: "Client-Focused Approach",
        description: "I prioritize clear communication and collaboration, working closely with you to ensure the final product exceeds your expectations."
    }
]

export function HireMeSection() {
    const phoneNumber = "919707191619";

    const handleWhatsAppClick = () => {
        const message = "Hello! I'm interested in your services and would like to discuss a project.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <section id="hire-me" className="py-24 md:py-32 bg-secondary/30">
            <motion.div
                className="container mx-auto px-4 md:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
                    >
                        Let's Create Something Amazing
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        I'm currently available for freelance projects. If you have an idea you'd like to discuss, feel free to reach out.
                    </motion.p>
                </div>
                
                <div className="max-w-5xl mx-auto mt-16">
                    <motion.h3 
                        variants={itemVariants}
                        className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
                    >
                        Why Hire Me?
                    </motion.h3>
                    <motion.div 
                        variants={sectionVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {reasonsToHire.map((reason) => (
                            <motion.div key={reason.title} variants={itemVariants}>
                                <Card className="h-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:border-primary border-transparent border-2 flex flex-col text-center items-center">
                                    <CardHeader className="items-center">
                                        <div className="p-4 bg-primary/10 rounded-full mb-4">
                                            {reason.icon}
                                        </div>
                                        <CardTitle className="text-2xl font-headline">{reason.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{reason.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button
                        size="lg"
                        className="w-full sm:w-auto font-bold text-lg py-4 px-10 bg-green-500 hover:bg-green-600 text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                        onClick={handleWhatsAppClick}
                    >
                        <Phone className="mr-2 h-5 w-5" />
                        Contact on WhatsApp
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
