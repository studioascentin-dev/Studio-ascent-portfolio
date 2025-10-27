
"use client";

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Youtube, ArrowRight, Code, PenTool, Camera, Video, Bot, ExternalLink } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ImageCompare } from '@/components/image-compare';
import { AnimatedDialog } from '@/components/ui/animated-dialog';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';


const portfolioData = {
  title: "Video Editing Portfolio",
  subtitle: "Explore my editing styles — from smooth velocity to candy-color vibes.",
  categories: [
    {
      title: "Candy Style Edits",
      videos: [
        { id: "LXb3EKWsInQ", title: "Corporate Brand Film" },
        { id: "sfA3Ie2vo_8", title: "Anime AMV" },
        { id: "LgVIhHj-VPA", title: "Instagram Reel" },
        { id: "Yp92s_3yI5A", title: "Color Grading Showcase" },
      ]
    },
    {
      title: "Slo-Mo / Velocity Edits",
      videos: [
        { id: "u31_KnwS_M8", title: "Social Media Ad" },
        { id: "LraNcH3fe1c", title: "Educational Video" },
        { id: "sfA3Ie2vo_8", title: "Dynamic Product Demo" },
        { id: "Yp92s_3yI5A", title: "Cinematic Slow Motion" },
      ]
    },
    {
      title: "Glitch / Sync Edits",
      videos: [
        { id: "LgVIhHj-VPA", title: "Music Video FX" },
        { id: "LXb3EKWsInQ", title: "Gaming Montage" },
        { id: "u31_KnwS_M8", title: "Tech Product Ad" },
        { id: "LraNcH3fe1c", title: "Event Promo" },
      ]
    },
    {
      title: "Trendy Reels",
      videos: [
        { id: "Yp92s_3yI5A", title: "Fashion Lookbook" },
        { id: "sfA3Ie2vo_8", title: "Travel Diary" },
        { id: "LXb3EKWsInQ", title: "Food Recipe" },
        { id: "u31_KnwS_M8", title: "Fitness Challenge" },
      ]
    }
  ]
};

const servicesData = {
  'video-editing': {
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    isPortfolio: true,
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
            image: placeholderImages.webProjects.food.url, 
            dataAiHint: placeholderImages.webProjects.food.hint, 
            link: '/',
            description: 'A full-stack food ordering platform built for a local kitchen, featuring a dynamic menu, user authentication, and a simple checkout process.',
            technologies: ['Next.js', 'React', 'Firebase', 'Tailwind CSS', 'ShadCN UI']
        },
        { 
            name: 'Custom E-commerce Store', 
            image: placeholderImages.webProjects.ecommerce.url,
            dataAiHint: placeholderImages.webProjects.ecommerce.hint,
            link: '#',
            description: 'A bespoke e-commerce solution with a custom design, product management, and a secure payment gateway integration for a seamless shopping experience.',
            technologies: ['Next.js', 'Stripe', 'GraphQL', 'TypeScript', 'PostgreSQL']
        },
        { 
            name: 'Portfolio Website', 
            image: placeholderImages.webProjects.portfolio.url, 
            dataAiHint: placeholderImages.webProjects.portfolio.hint,
            link: '#',
            description: 'A personal portfolio site to showcase creative work, featuring a clean design, smooth animations, and a contact form for inquiries.',
            technologies: ['React', 'Framer Motion', 'Next.js', 'Tailwind CSS']
        },
    ]
  },
};

const getEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}`;

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


const VideoPortfolio = () => (
    <div className="flex min-h-screen flex-col bg-[#0F0F0F] text-white">
      <Header />
      <main className="flex-1 pt-24">
        <motion.section
          className="py-20 md:py-24"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.header variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter text-white">
                {portfolioData.title}
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg/relaxed text-gray-300">
                {portfolioData.subtitle}
              </p>
            </motion.header>

            <div className="space-y-16 md:space-y-20">
              {portfolioData.categories.map((category) => (
                <motion.div key={category.title} variants={sectionVariants}>
                  <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold font-headline mb-8 text-center text-white">
                    {category.title}
                  </motion.h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {category.videos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                  <motion.div variants={itemVariants} className="text-center mt-12">
                    <Button asChild variant="outline" className="border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition-colors">
                      <Link href="#">
                        View More {category.title}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
             <motion.div variants={itemVariants} className="text-center mt-16 md:mt-24">
                <Button asChild variant="outline" className="bg-transparent hover:bg-white/10">
                    <Link href="/#services">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Services
                    </Link>
                </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
);

const VideoCard = ({ video }: { video: { id: string, title: string } }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative aspect-video w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-primary/20"
      whileHover={{ y: -8, scale: 1.03 }}
    >
      <iframe
        src={getEmbedUrl(video.id)}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Youtube className="w-12 h-12 text-white/80" />
      </div>
    </motion.div>
  );
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

  const isInteractive = slug === 'ai-chatbot';

  const cardContent = (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm group h-full flex flex-col">
        <CardHeader className="p-0 relative aspect-video">
            {project.video ? (
                <div className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                     <iframe
                        src={getEmbedUrl(project.video)}
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

  if (slug === 'video-editing') {
    return <VideoPortfolio />;
  }

  const handleCardClick = (project: any, originRect: DOMRect) => {
    setSelectedProject(project);
    setOrigin(originRect);
  };
  

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
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
                    
                    {slug === 'web-development' && 'projects' in service ? (
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
                    ) : 'projects' in service && (
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
                                            src={getEmbedUrl(selectedProject.video)}
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

    

    