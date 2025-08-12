
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './ui/button';

const skills = [
    { name: 'HTML', level: 95 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 88 },
    { name: 'Next.js', level: 86 },
    { name: 'Node.js', level: 80 },
    { name: 'Figma', level: 92 },
    { name: 'Photoshop', level: 95 },
];

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

    const barVariants = {
        hidden: { width: 0 },
        visible: { 
            width: 'var(--level)',
            transition: { duration: 1.5, ease: 'easeOut' }
        },
    };

    return (
        <section className="py-16 md:py-24">
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

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div variants={itemVariants}>
                        <Image 
                            src="/images/profileicon.png"
                            alt="Dev Kumar Das"
                            width={600}
                            height={600}
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h3 className="text-4xl font-headline font-bold">A dedicated Developer based in Sonapur, India 📍</h3>
                        <p className="text-muted-foreground text-xl">
                            As a Junior Full-Stack Developer, I possess an impressive arsenal of skills in HTML, CSS, JavaScript, React, and Next.js. My expertise lies in crafting dynamic, engaging interfaces through writing clean and optimized code and utilizing cutting-edge development tools and techniques. I am also a team player who thrives in collaborating with cross-functional teams to produce outstanding web applications.
                        </p>
                        <Button asChild size="lg" className="font-bold">
                            <a href="#contact">Hire Me</a>
                        </Button>
                    </motion.div>
                </div>

                <motion.div 
                    variants={itemVariants}
                    className="mt-24"
                >
                    <h3 className="text-3xl font-bold font-headline text-center mb-12">My <span className="text-primary">Skills</span></h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {skills.map(skill => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-lg">{skill.name}</span>
                                    <span className="text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-secondary rounded-full h-2.5">
                                    <motion.div 
                                        className="bg-primary h-2.5 rounded-full"
                                        style={{ '--level': `${skill.level}%` } as React.CSSProperties}
                                        variants={barVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
