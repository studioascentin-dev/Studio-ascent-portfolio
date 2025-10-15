

"use client";

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Video, Camera, Bot, Code, PenTool, ExternalLink, ArrowRight } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';
import { ImageCompare } from '@/components/image-compare';
import Link from 'next/link';
import { AnimatedDialog } from '@/components/ui/animated-dialog';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const getEmbedUrl = (url: string) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
};

const servicesData = {
  'video-editing': {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    projects: [
      { name: 'YouTube Videos', video: getEmbedUrl('https://www.youtube.com/watch?v=LXb3EKWsInQ') },
      { name: 'Instagram Edits', video: getEmbedUrl('https://youtube.com/shorts/LgVIhHj-VPA') },
      { name: 'Colour Grading', video: getEmbedUrl('https://www.youtube.com/watch?v=Yp92s_3yI5A') },
      { name: 'Anime AMV edits', video: getEmbedUrl('https://www.youtube.com/watch?v=sfA3Ie2vo_8') },
      { name: 'Educational Videos', video: getEmbedUrl('https://www.youtube.com/watch?v=LraNcH3fe1c') },
      { name: 'Social Media Ad', video: getEmbedUrl('https://www.youtube.com/watch?v=u31_KnwS_M8') },
    ]
  },
  'photo-editing': {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    projects: [
        { name: 'High-End Retouching', before: '/images/beforeimg1.jpg', after: '/images/afterimg1.png', dataAiHint: 'portrait retouch' },
        { name: 'Logo Design', image: '/images/logokit.png', dataAiHint: 'photo manipulation' },
        { name: 'Social Media Content Design', image: '/portrait-after.png', dataAiHint: 'professional portrait' },
        { name: 'Menu or Brochure Design', image: '/images/menu.png', dataAiHint: 'product photography' },
        { name: 'Simple Color Grading', before: '/images/indiandog.jpg', after: '/images/indiandog.png', dataAiHint: 'artistic color' },
        { name: 'Poster & Flyer Design', image: '/images/poster.png', dataAiHint: 'artistic color' },
    ]
  },
  'ai-chatbot': {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'AI Chatbot',
    description: 'I create intelligent, automated chatbots for WhatsApp and websites to handle support, book appointments, and generate leads, allowing you to focus on your business.',
    projects: [
        { name: 'Telegram Bot', image: '/images/telegrambot.png', dataAiHint: 'chatbot conversation', detail: 'A custom Telegram bot to automate tasks and engage with users directly in the app.' },
        { name: 'Restaurant Booking Bot', image: '/images/restaurentbot.png', dataAiHint: 'booking system', detail: 'An AI-powered bot for WhatsApp that allows customers to book tables, view menus, and get instant confirmations.' },
        { name: 'Instagram Bot', image: '/images/instagrambot.png', dataAiHint: 'lead generation', detail: 'A chatbot for websites and messaging apps that captures potential buyer and seller leads, asking qualifying questions and saving data to a CRM.' },
        { name: 'Whatsapp Bot', image: '/images/Whatsappbot.png', dataAiHint: 'ai assistant', detail: 'An advanced assistant integrated with GPT for natural, human-like conversations, capable of handling complex customer service inquiries.' },
        { name: 'E-commerce Order Bot', image: '/images/ecommercebot.png', dataAiHint: 'online shopping', detail: 'A WhatsApp bot that lets customers browse products, place orders, and make payments directly within the chat.' },
        { name: 'Service Appointment Scheduler', image: '/images/appointmentbot.png', dataAiHint: 'calendar scheduling', detail: 'An automated scheduler that helps clients book, reschedule, or cancel appointments for services like salons, clinics, and consultations.' },
    ]
  },
  'web-development': {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    projects: [
        { 
            name: 'Food Ordering Website', 
            image: '/sabitas-kitchen.png', 
            dataAiHint: 'food order website', 
            link: 'https://6000-firebase-studio-1755428735571.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev/',
            description: 'A full-stack food ordering platform built for a local kitchen, featuring a dynamic menu, user authentication, and a simple checkout process.',
            technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'ShadCN UI']
        },
        { 
            name: 'Custom E-commerce Store', 
            image: 'https://picsum.photos/seed/ecomm/600/450', 
            dataAiHint: 'ecommerce homepage', 
            link: 'https://your-website-link.com',
            description: 'A bespoke e-commerce solution with a custom design, product management, and a secure payment gateway integration for a seamless shopping experience.',
            technologies: ['Next.js', 'Stripe', 'GraphQL', 'TypeScript', 'PostgreSQL']
        },
        { 
            name: 'Portfolio Website', 
            image: 'https://picsum.photos/seed/portfolio/600/450', 
            dataAiHint: 'portfolio website', 
            link: 'https://your-website-link.com',
            description: 'A personal portfolio site to showcase creative work, featuring a clean design, smooth animations, and a contact form for inquiries.',
            technologies: ['React', 'Framer Motion', 'Next.js', 'Tailwind CSS']
        },
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

const ProjectCard = ({ project, slug, onCardClick }: { project: any, slug: string, onCardClick: (project: any, origin: DOMRect) => void }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    if (cardRef.current) {
        onCardClick(project, cardRef.current.getBoundingClientRect());
    }
  };

  const isInteractive = slug === 'ai-chatbot' || slug === 'video-editing';

  const cardContent = (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col">
        <CardHeader className="p-0 relative aspect-video">
            {project.video ? (
                <div className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                     <iframe
                        src={project.video}
                        title={`Preview video for ${project.name}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
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
        <CardContent className="p-4 flex-grow flex items-center justify-between">
            <h4 className="font-headline text-base md:text-lg">{project.name}</h4>
            {(project.link || project.pdf) && <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
        </CardContent>
    </Card>
  );

  return (
      <article ref={cardRef} onClick={isInteractive ? handleCardClick : undefined} className={cn(isInteractive ? "cursor-pointer" : "", "h-full")}>
          {cardContent}
      </article>
  );
};


export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug as keyof typeof servicesData];
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [origin, setOrigin] = React.useState<DOMRect | null>(null);

  if (!service) {
    notFound();
  }

  const handleCardClick = (project: any, originRect: DOMRect) => {
    setSelectedProject(project);
    setOrigin(originRect);
  };
  

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
                        <header className="flex flex-col items-center text-center space-y-4">
                            <div className="inline-block p-4 bg-primary/10 rounded-full">
                                {React.cloneElement(service.icon, { className: 'h-8 w-8 md:h-12 md:w-12 text-primary' })}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold font-headline">{service.title}</h1>
                            <p className="text-sm md:text-lg text-muted-foreground">{service.description}</p>
                        </header>
                    </motion.div>
                    
                    {slug === 'web-development' ? (
                       <div className="space-y-16 md:space-y-24 mt-16 md:mt-24">
                            {service.projects.map((project: any, index: number) => (
                                <motion.article
                                    key={project.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className={cn(
                                        "grid md:grid-cols-2 gap-6 md:gap-12 items-center"
                                    )}
                                >
                                    <div className={cn("relative aspect-video group", index % 2 === 1 && "md:order-2")}>
                                        <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" aria-label={`View live site for ${project.name}`}>
                                            <Image
                                                src={project.image}
                                                alt={project.name}
                                                width={600}
                                                height={450}
                                                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
                                                data-ai-hint={project.dataAiHint}
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                                                <ExternalLink className="w-8 h-8 text-white" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={cn("space-y-3 md:space-y-4", index % 2 === 1 && "md:order-1")}>
                                        <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                            <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary hover:underline">{project.name}</h3>
                                        </Link>
                                        <p className="text-muted-foreground text-sm md:text-base">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech: string) => (
                                                <Badge key={tech} variant="secondary" className="backdrop-blur-sm bg-secondary/70">{tech}</Badge>
                                            ))}
                                        </div>
                                        <Button asChild variant="link" className="p-0 font-semibold group">
                                            <Link href={project.link} target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                                                View Live Site
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            variants={cardContainerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
                        >
                            {service.projects.map((project: any) => (
                                <motion.div
                                    key={project.name}
                                    variants={cardVariants}
                                >
                                    <ProjectCard project={project} slug={slug} onCardClick={handleCardClick} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {selectedProject && origin && (
                           <AnimatedDialog origin={origin} onOpenChange={() => setSelectedProject(null)}>
                                <DialogHeader>
                                    <DialogTitle className="font-headline text-xl md:text-2xl mb-2">{selectedProject.name}</DialogTitle>
                                    {selectedProject.detail && (
                                        <DialogDescription className="text-sm md:text-base">
                                            {selectedProject.detail}
                                        </DialogDescription>
                                    )}
                                </DialogHeader>
                                <div className="mt-4">
                                {selectedProject.image && (
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.name}
                                        width={600}
                                        height={450}
                                        className="w-full h-auto object-cover rounded-md"
                                        data-ai-hint={selectedProject.dataAiHint}
                                    />

                                )}
                                {selectedProject.video && (
                                    <div className="aspect-video">
                                        <iframe
                                            src={selectedProject.video}
                                            title={`Preview video for ${selectedProject.name}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full rounded-md"
                                        ></iframe>
                                    </div>
                                )}
                                </div>
                           </AnimatedDialog>
                        )}
                    </AnimatePresence>


                    <div className="text-center mt-8 md:mt-12">
                        <Button asChild variant="outline" size="lg">
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
