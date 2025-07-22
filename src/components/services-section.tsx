
"use client";

import { Video, Camera, Presentation, Code, PenTool } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const services = [
  {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that captivates and engages your audience.',
    projects: [
      { name: 'Corporate Brand Film', image: 'https://placehold.co/600x400.png', dataAiHint: 'corporate video' },
      { name: 'Social Media Ad Campaign', image: 'https://placehold.co/600x400.png', dataAiHint: 'social media marketing' },
      { name: 'Wedding Highlights', image: 'https://placehold.co/600x400.png', dataAiHint: 'wedding film' },
    ]
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    projects: [
        { name: 'E-commerce Product Showcase', image: 'https://placehold.co/600x400.png', dataAiHint: 'product photography' },
        { name: 'Fashion Lookbook', image: 'https://placehold.co/600x400.png', dataAiHint: 'fashion model' },
        { name: 'Real Estate Photography', image: 'https://placehold.co/600x400.png', dataAiHint: 'luxury home' },
    ]
  },
  {
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'I create stunning and effective presentations that not only look great but also communicate your message clearly, making sure you stand out in any setting.',
    projects: [
        { name: 'Startup Pitch Deck', image: 'https://placehold.co/600x400.png', dataAiHint: 'business presentation' },
        { name: 'Corporate Training Materials', image: 'https://placehold.co/600x400.png', dataAiHint: 'corporate training' },
        { name: 'Webinar Slides', image: 'https://placehold.co/600x400.png', dataAiHint: 'online webinar' },
    ]
  },
  {
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Web Design',
    description: 'I design beautiful, intuitive, and user-friendly web interfaces that provide an exceptional user experience and make a lasting impression on your visitors.',
    projects: [
        { name: 'Artist Portfolio Website', image: 'https://placehold.co/600x400.png', dataAiHint: 'art portfolio' },
        { name: 'Restaurant Booking Site', image: 'https://placehold.co/600x400.png', dataAiHint: 'restaurant interior' },
        { name: 'Non-Profit Organization Site', image: 'https://placehold.co/600x400.png', dataAiHint: 'charity event' },
    ]
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    projects: [
        { name: 'SaaS Platform Development', image: 'https://placehold.co/600x400.png', dataAiHint: 'dashboard interface' },
        { name: 'Custom E-commerce Store', image: 'https://placehold.co/600x400.png', dataAiHint: 'online shopping' },
        { name: 'Content Management System', image: 'https://placehold.co/600x400.png', dataAiHint: 'blogging platform' },
    ]
  },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut"
        }
    })
};


export function ServicesSection() {
  return (
    <section id="services" className="bg-background py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                className="mb-12"
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">My Services</h2>
                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                        A closer look at the digital services I provide to bring your vision to life.
                    </p>
                </div>
            </motion.div>
            
            <div className="flex flex-col gap-24 md:gap-32">
                {services.map((service, serviceIndex) => (
                    <motion.div 
                        key={service.title}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionVariants}
                        className="space-y-12"
                    >
                        <div className="max-w-5xl space-y-8 mx-auto text-center">
                            <div className="inline-block p-3 bg-primary/10 rounded-full">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold font-headline">{service.title}</h3>
                            <p className="text-muted-foreground text-lg">{service.description}</p>
                        </div>
                        
                        <div className="mx-auto max-w-5xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {service.projects.map((project, projectIndex) => (
                                    <motion.div
                                        key={project.name}
                                        custom={projectIndex}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        variants={cardVariants}
                                    >
                                        <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col">
                                            <CardHeader className="p-0 relative">
                                                <Image
                                                    src={project.image}
                                                    alt={project.name}
                                                    width={600}
                                                    height={400}
                                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                                    data-ai-hint={project.dataAiHint}
                                                />
                                            </CardHeader>
                                            <CardContent className="p-6 flex-grow">
                                                <h4 className="font-headline text-xl">{project.name}</h4>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Button size="lg" className="font-bold text-lg py-6 px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                                View More
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}
