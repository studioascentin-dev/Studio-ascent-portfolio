
"use client";

import { Video, Camera, Presentation, Code, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as React from 'react';
import Image from 'next/image';
import { ImageCompare } from './image-compare';

const services = [
  {
    id: 'video-editing',
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    projects: [
      { name: 'YouTube Videos', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { name: 'Instagram Reels', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { name: 'Color Grading & VFX', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    ]
  },
  {
    id: 'photo-editing',
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    projects: [
        { name: 'Custom Photoshop Work', before: '/images/photoshop-before.png', after: '/images/photoshop-after.png', dataAiHint: 'product photography' },
        { name: 'High-End Retouching', before: '/images/retouch-before.png', after: '/images/retouch-after.png', dataAiHint: 'fashion model' },
        { name: 'Image Compositing', before: '/images/compositing-before.png', after: '/images/compositing-after.png', dataAiHint: 'modern interior' },
    ]
  },
  {
    id: 'ppt-design',
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'I create stunning and effective presentations that not only look great but also communicate your message clearly, making sure you stand out in any setting.',
    projects: [
        { name: 'Startup Pitch Deck', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
        { name: 'Corporate Training Materials', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { name: 'Webinar Slides', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    ]
  },
  {
    id: 'graphic-design',
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Graphic Design',
    description: 'I create compelling and beautiful visuals that tell a story, define a brand, and capture attention. From logos to complete brand identities, I craft designs that make an impact.',
    projects: [
        { name: 'Modern Logo Design', image: 'https://placehold.co/600x450.png', dataAiHint: 'modern logo' },
        { name: 'Brand Identity Pack', image: 'https://placehold.co/600x450.png', dataAiHint: 'branding identity' },
        { name: 'Social Media Campaign', image: 'https://placehold.co/600x450.png', dataAiHint: 'social media' },
    ]
  },
  {
    id: 'web-development',
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    projects: [
        { name: 'SaaS Platform Front-End', image: 'https://placehold.co/600x450.png', dataAiHint: 'dashboard ui' },
        { name: 'Custom E-commerce Store', image: 'https://placehold.co/600x450.png', dataAiHint: 'ecommerce homepage' },
        { name: 'Portfolio Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'portfolio website' },
    ]
  },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

interface ServicesSectionProps {
  refs: {
    videoEditingRef: React.RefObject<HTMLDivElement>;
    photoEditingRef: React.RefObject<HTMLDivElement>;
    pptDesignRef: React.RefObject<HTMLDivElement>;
    graphicDesignRef: React.RefObject<HTMLDivElement>;
    webDevelopmentRef: React.RefObject<HTMLDivElement>;
  }
}

export function ServicesSection({ refs }: ServicesSectionProps) {
  const serviceRefs = {
    'video-editing': refs.videoEditingRef,
    'photo-editing': refs.photoEditingRef,
    'ppt-design': refs.pptDesignRef,
    'graphic-design': refs.graphicDesignRef,
    'web-development': refs.webDevelopmentRef,
  };

  return (
    <section id="services" className="bg-background min-h-screen flex flex-col justify-center py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="mb-12 md:mb-16"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h2 variants={itemVariants} className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">My Services</motion.h2>
                    <motion.p variants={itemVariants} className="text-muted-foreground md:text-xl/relaxed mt-6 max-w-2xl mx-auto">
                        A closer look at the digital services I provide to bring your vision to life.
                    </motion.p>
                </div>
            </motion.div>
            
            <div className="flex flex-col gap-16 md:gap-24">
                {services.map((service) => (
                    <motion.div 
                        key={service.title}
                        id={service.id}
                        ref={serviceRefs[service.id as keyof typeof serviceRefs]}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={sectionVariants}
                        className="space-y-8 md:space-y-12"
                    >
                        <motion.div variants={itemVariants} className="max-w-5xl space-y-6 mx-auto text-center">
                            <div className="inline-block p-4 bg-primary/10 rounded-full">
                                {React.cloneElement(service.icon, { className: 'h-10 w-10 md:h-12 md:w-12 text-primary' })}
                            </div>
                            <h3 className="text-3xl md:text-5xl font-bold font-headline">{service.title}</h3>
                            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">{service.description}</p>
                        </motion.div>
                        
                        <motion.div
                          variants={cardContainerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, amount: 0.2 }}
                          className="mx-auto max-w-7xl"
                        >
                            <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-4 md:gap-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                                {service.projects.slice(0, 3).map((project: any) => (
                                    <motion.div
                                        key={project.name}
                                        variants={cardVariants}
                                        className="w-4/5 flex-shrink-0 snap-center md:w-auto"
                                    >
                                        <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col">
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
                                                ) : project.before && project.after ? (
                                                    <ImageCompare
                                                        before={project.before}
                                                        after={project.after}
                                                        alt={project.name}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={project.image}
                                                        alt={project.name}
                                                        width={600}
                                                        height={450}
                                                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                                        data-ai-hint={project.dataAiHint}
                                                    />
                                                )}
                                            </CardHeader>
                                            <CardContent className="p-4 flex-grow flex flex-col">
                                                <h4 className="font-headline text-lg flex-grow">{project.name}</h4>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center mt-8 md:mt-12">
                             <Button asChild size="lg" className="font-bold text-lg md:text-base py-3 px-8 md:py-6 md:px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                                <a href={`/services/${service.id}`}>View More</a>
                            </Button>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
