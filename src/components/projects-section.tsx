
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
    { 
      name: 'High-End Retouching', 
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      category: 'Photo Editing',
      href: '/services/photo-editing'
    },
    { 
      name: 'Brand Story', 
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
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
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      category: 'Web Development',
      href: '/services/web-development'
    },
    { 
      name: 'Startup Pitch Deck', 
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      category: 'PPT Design',
      href: '/services/ppt-design'
    },
    { 
      name: 'Social Media Ad', 
      video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      category: 'Video Editing',
      href: '/services/video-editing'
    },
];

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

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 md:py-32 bg-secondary/30">
            <motion.div
                className="container mx-auto px-4 md:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
                    >
                        My Recent Work
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
                    className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto"
                >
                    {projects.map((project: any) => (
                        <motion.div
                            key={project.name}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Link href={project.href} className="block h-full">
                                <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 overflow-hidden group">
                                    <CardHeader className="p-0 relative aspect-video">
                                         {project.video ? (
                                            <video
                                                src={project.video}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                width={600}
                                                height={450}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                data-ai-hint={project.dataAiHint}
                                            />
                                        )}
                                    </CardHeader>
                                    <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                                        <p className="text-sm font-medium text-primary mb-1">{project.category}</p>
                                        <h4 className="font-headline text-lg md:text-2xl flex-grow">{project.name}</h4>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                 <motion.div variants={itemVariants} className="text-center mt-16">
                    <Button asChild size="lg" className="font-bold text-lg py-4 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                        <a href="#services">View All Services</a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
