

"use client";

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, Video, Camera, Presentation, Code, PenTool } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';
import { ImageCompare } from '@/components/image-compare';

const servicesData = {
  'video-editing': {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    projects: [
      { name: 'YouTube Videos', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { name: 'Instagram Reels', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { name: 'Color Grading', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { name: 'Brand Story', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { name: 'Wedding Film', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { name: 'Social Media Ad', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
    ]
  },
  'photo-editing': {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    projects: [
        { name: 'Custom Photoshop Work', before: 'https://placehold.co/600x450.png', after: 'https://placehold.co/600x450.png', dataAiHint: 'photo retouching' },
        { name: 'High-End Retouching', before: 'YOUR_BEFORE_IMAGE_URL_HERE', after: 'YOUR_AFTER_IMAGE_URL_HERE', dataAiHint: 'portrait retouch' },
        { name: 'Image Compositing', before: 'https://placehold.co/600x450.png', after: 'https://placehold.co/600x450.png', dataAiHint: 'photo manipulation' },
        { name: 'Portrait Retouching', before: 'https://placehold.co/600x450.png', after: 'https://placehold.co/600x450.png', dataAiHint: 'professional portrait' },
        { name: 'Food & Product Retouching', before: 'https://placehold.co/600x450.png', after: 'https://placehold.co/600x450.png', dataAiHint: 'product photography' },
        { name: 'Creative Color Grading', before: 'https://placehold.co/600x450.png', after: 'https://placehold.co/600x450.png', dataAiHint: 'artistic color' },
    ]
  },
  'ppt-design': {
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'I create stunning and effective presentations that not only look great but also communicate your message clearly, making sure you stand out in any setting.',
    projects: [
        { name: 'Startup Pitch Deck', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
        { name: 'Corporate Training Materials', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        { name: 'Webinar Slides', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { name: 'Investor Update Deck', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
        { name: 'Sales Presentation', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
        { name: 'Educational Lecture', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    ]
  },
  'graphic-design': {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Graphic Design',
    description: 'I create compelling and beautiful visuals that tell a story, define a brand, and capture attention. From logos to complete brand identities, I craft designs that make an impact.',
    projects: [
        { name: 'Modern Logo Design', image: 'https://placehold.co/600x450.png', dataAiHint: 'modern logo' },
        { name: 'Brand Identity Pack', image: 'https://placehold.co/600x450.png', dataAiHint: 'branding identity' },
        { name: 'Social Media Campaign', image: 'https://placehold.co/600x450.png', dataAiHint: 'social media' },
        { name: 'Event Poster Design', image: 'https://placehold.co/600x450.png', dataAiHint: 'event poster' },
        { name: 'Product Packaging', image: 'https://placehold.co/600x450.png', dataAiHint: 'product package' },
        { name: 'Book Cover Design', image: 'https://placehold.co/600x450.png', dataAiHint: 'book cover' },
    ]
  },
  'web-development': {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    projects: [
        { name: 'SaaS Platform Front-End', image: 'https://placehold.co/600x450.png', dataAiHint: 'dashboard ui' },
        { name: 'Custom E-commerce Store', image: 'https://placehold.co/600x450.png', dataAiHint: 'ecommerce homepage' },
        { name: 'Portfolio Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'portfolio website' },
        { name: 'API Integration Project', image: 'https://placehold.co/600x450.png', dataAiHint: 'api integration' },
        { name: 'Next.js & Firebase App', image: 'https://placehold.co/600x450.png', dataAiHint: 'web application' },
        { name: 'Headless CMS Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'cms website' },
    ]
  },
};

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
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


export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-8 md:space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto space-y-4"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="inline-block p-4 bg-primary/10 rounded-full">
                                {React.cloneElement(service.icon, { className: 'h-10 w-10 md:h-12 md:w-12 text-primary' })}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold font-headline">{service.title}</h1>
                            <p className="text-base md:text-lg text-muted-foreground">{service.description}</p>
                        </div>
                    </motion.div>

                    <motion.div
                      variants={cardContainerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {service.projects.map((project: any) => (
                            <motion.div
                                key={project.name}
                                variants={cardVariants}
                            >
                                <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col">
                                    <CardHeader className="p-0 relative aspect-square">
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
                                        ) : project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                width={600}
                                                height={450}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                data-ai-hint={project.dataAiHint}
                                            />
                                        ) : null}
                                    </CardHeader>
                                    <CardContent className="p-4 flex-grow">
                                        <h4 className="font-headline text-base md:text-xl">{project.name}</h4>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Button asChild className="font-bold text-lg py-4 px-10 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                            <a href="/#services">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Services
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
