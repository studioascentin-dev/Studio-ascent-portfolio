
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';

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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

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
                    className="text-5xl md:text-6xl font-bold font-headline text-center mb-12"
                >
                    About <span className="text-primary">Me</span>
                </motion.h2>

                <div className="flex justify-center">
                    <motion.div variants={itemVariants} className="space-y-6 max-w-3xl text-center">
                        <h3 className="text-4xl font-headline font-bold">A dedicated Developer based in Sonapur, India 📍</h3>
                        <p className="text-muted-foreground text-xl">
                            As a Junior Full-Stack Developer, I possess an impressive arsenal of skills in HTML, CSS, JavaScript, React, and Next.js. My expertise lies in crafting dynamic, engaging interfaces through writing clean and optimized code and utilizing cutting-edge development tools and techniques. I am also a team player who thrives in collaborating with cross-functional teams to produce outstanding web applications.
                        </p>
                        <Button asChild size="lg" className="font-bold">
                            <a href="#contact">Hire Me</a>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
