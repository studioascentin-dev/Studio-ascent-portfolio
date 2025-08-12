
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const projects = [
    { 
      name: 'High-End Retouching', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'fashion model',
      category: 'Photo Editing',
      href: '/services/photo-editing'
    },
    { 
      name: 'Brand Story', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'cinematic video',
      category: 'Video Editing',
      href: '/services/video-editing'
    },
    { 
      name: 'Modern Logo Design', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'modern logo',
      category: 'UI/UX Design',
      href: '/services/ui-ux-design'
    },
    { 
      name: 'Custom E-commerce Store', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'ecommerce website',
      category: 'Web Development',
      href: '/services/web-development'
    },
    { 
      name: 'Startup Pitch Deck', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'presentation design',
      category: 'PPT Design',
      href: '/services/ppt-design'
    },
    { 
      name: 'Social Media Ad', 
      image: 'https://placehold.co/600x450.png',
      dataAiHint: 'social media marketing',
      category: 'Video Editing',
      href: '/services/video-editing'
    },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
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

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 md:py-32 bg-secondary/50">
            <motion.div
                className="container mx-auto px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl"
                    >
                        My Recent <span className="text-primary">Work</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        Here's a glimpse of what I can do. Check out some of my favorite projects.
                    </motion.p>
                </div>

                <motion.div
                    variants={sectionVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project: any) => (
                        <motion.div
                            key={project.name}
                            variants={itemVariants}
                        >
                            <Link href={project.href} className="block h-full group">
                                <Card className="flex flex-col h-full bg-card shadow-lg transition-all duration-300 overflow-hidden relative">
                                    <CardHeader className="p-0 aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            width={600}
                                            height={450}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            data-ai-hint={project.dataAiHint}
                                        />
                                    </CardHeader>
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h4 className="font-headline text-2xl text-white mb-2">{project.name}</h4>
                                        <p className="text-sm font-medium text-primary mb-4">{project.category}</p>
                                        <ExternalLink className="w-8 h-8 text-white"/>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
