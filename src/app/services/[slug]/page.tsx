

"use client";

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Video, Camera, Bot, Code, PenTool, ExternalLink } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import * as React from 'react';
import Image from 'next/image';
import { ImageCompare } from '@/components/image-compare';
import Link from 'next/link';
import { AnimatedDialog } from '@/components/ui/animated-dialog';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const servicesData = {
  'video-editing': {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    projects: [
      { name: 'YouTube Videos', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { name: 'Instagram Reels', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { name: 'Colour Grading', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { name: 'Anime AMV edits', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { name: 'Educational Videos', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { name: 'Social Media Ad', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
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
        { name: 'Food Ordering Website', image: '/sabitas-kitchen.png', dataAiHint: 'food order website', link: 'https://6000-firebase-studio-1755428735571.cluster-zumahodzirciuujpqvsniawo3o.cloudworkstations.dev/' },
        { name: 'Custom E-commerce Store', image: 'https://placehold.co/600x450.png', dataAiHint: 'ecommerce homepage', link: 'https://your-website-link.com' },
        { name: 'Portfolio Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'portfolio website', link: 'https://your-website-link.com' },
        { name: 'Admin Dashboard', image: 'https://placehold.co/600x450.png', dataAiHint: 'api integration', link: 'https://6000-firebase-studio-1758434992699.cluster-y75up3teuvc62qmnwys4deqv6y.cloudworkstations.dev/' },
        { name: 'Next.js & Firebase App', image: 'https://placehold.co/600x450.png', dataAiHint: 'web application', link: 'https://your-website-link.com' },
        { name: 'Headless CMS Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'cms website', link: 'https://your-website-link.com' },
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
  const [selectedProject, setSelectedProject] = React.useState<any>(null);
  const [origin, setOrigin] = React.useState<DOMRect | null>(null);

  if (!service) {
    notFound();
  }
  
  const ProjectCard = ({ project, cardRef }: { project: any, cardRef?: React.Ref<HTMLDivElement> }) => {
    const cardContent = (
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col cursor-pointer">
          <CardHeader className="p-0 relative aspect-video">
              {project.video ? (
                  <video
                      src={project.video}
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
          <CardContent className="p-4 flex-grow flex items-center justify-between">
              <h4 className="font-headline text-base md:text-xl">{project.name}</h4>
              {(project.link || project.pdf) && <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
          </CardContent>
      </Card>
    );

    const handleCardClick = () => {
      if (cardRef && 'current' in cardRef && cardRef.current) {
        setOrigin(cardRef.current.getBoundingClientRect());
      }
      setSelectedProject(project);
    };

    if (slug === 'ai-chatbot' || slug === 'video-editing') {
        return (
            <div ref={cardRef} onClick={handleCardClick}>
                {cardContent}
            </div>
        )
    }

    if (project.link || project.pdf) {
        return (
            <a href={project.link || project.pdf} target="_blank" rel="noopener noreferrer" className="block h-full">
                {cardContent}
            </a>
        );
    }

    // Default for photo-editing and others that don't have interactive dialogs.
    return (
        <div ref={cardRef} onClick={() => {
            // Placeholder for potential future interactions
        }}>
            {cardContent}
        </div>
    );
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
                        {service.projects.map((project: any) => {
                             const cardRef = React.useRef<HTMLDivElement>(null);
                             return (
                                <motion.div
                                    key={project.name}
                                    variants={cardVariants}
                                >
                                    <ProjectCard project={project} cardRef={cardRef} />
                                </motion.div>
                             )
                        })}
                    </motion.div>

                    <AnimatePresence>
                        {selectedProject && origin && (
                           <AnimatedDialog origin={origin} onOpenChange={() => setSelectedProject(null)}>
                                <DialogHeader>
                                    <DialogTitle className="font-headline text-2xl mb-2">{selectedProject.name}</DialogTitle>
                                    {selectedProject.detail && (
                                        <DialogDescription>
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
                                    <video
                                        src={selectedProject.video}
                                        controls
                                        controlsList="nodownload"
                                        autoPlay
                                        className="w-full h-auto object-cover rounded-md"
                                    />
                                )}
                                </div>
                           </AnimatedDialog>
                        )}
                    </AnimatePresence>


                    <div className="text-center mt-12">
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


    