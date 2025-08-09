
"use client";

import { Video, Camera, Presentation, Code, PenTool, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import * as React from 'react';
import Image from 'next/image';
import { ImageCompare } from './image-compare';
import Link from 'next/link';

const services = [
  {
    id: 'video-editing',
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'From corporate brand films to dynamic social media ads, I bring your vision to life with professional video editing that ancapts and engages your audience.',
    projects: [
      { name: 'YouTube Videos', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { name: 'Instagram Reels', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { name: 'Colour Grading', video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
    ]
  },
  {
    id: 'photo-editing',
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'With high-quality photo retouching and manipulation, I enhance your images to perfection, ensuring your product shots and portraits look stunning and professional.',
    projects: [
        { name: 'High-End Retouching', before: '/beforeimg1.png', after: '/afterimg1.png', dataAiHint: 'fashion model' },
        { name: 'Logo Design', image: '/images/logokit.png', dataAiHint: 'modern interior' },
        { name: 'Simple Color Grading', before: '/images/indiandog.jpg', after: '/images/indiandog.png', dataAiHint: 'artistic color' },
    ]
  },
  {
    id: 'ppt-design',
    icon: <Presentation className="h-10 w-10 text-primary" />,
    title: 'PPT Design',
    description: 'I create stunning and effective presentations that not only look great but also communicate your message clearly, making sure you stand out in any setting.',
    projects: [
        { name: 'School/College Presentation Design', image: 'https://placehold.co/600x450.png', pdf: '/school-ppt.pdf', dataAiHint: 'education presentation' },
        { name: 'Projects Report in PPT', image: 'https://placehold.co/600x450.png', pdf: '/report-ppt.pdf', dataAiHint: 'business report' },
        { name: 'Company Profile PPT', image: 'https://placehold.co/600x450.png', pdf: '/company-profile.pdf', dataAiHint: 'corporate deck' },
    ]
  },
  {
    id: 'graphic-design',
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Graphic Design',
    description: 'I create compelling and beautiful visuals that tell a story, define a brand, and capture attention. From logos to complete brand identities, I craft designs that make an impact.',
    projects: [
        { name: 'Personal Portfolio Website design', image: 'https://placehold.co/600x450.png', dataAiHint: 'modern logo' },
        { name: 'Business or Startup Landing Page', image: 'https://placehold.co/600x450.png', dataAiHint: 'branding identity' },
        { name: 'E-commerce Website UI Design', image: 'https://placehold.co/600x450.png', dataAiHint: 'social media' },
    ]
  },
  {
    id: 'web-development',
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'I build robust, scalable, and high-performance websites and applications that are not only fast and reliable but also tailored to your specific business needs.',
    projects: [
        { name: 'SaaS Platform Front-End', image: 'https://placehold.co/600x450.png', dataAiHint: 'dashboard ui', link: 'https://your-website-link.com' },
        { name: 'Custom E-commerce Store', image: 'https://placehold.co/600x450.png', dataAiHint: 'ecommerce homepage', link: 'https://your-website-link.com' },
        { name: 'Portfolio Website', image: 'https://placehold.co/600x450.png', dataAiHint: 'portfolio website', link: 'https://your-website-link.com' },
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

  const ProjectCard = ({ project, serviceId }: { project: any, serviceId: string }) => {
    const cardContent = (
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
              ) : project.image ? (
                  <Image
                      src={project.image}
                      alt={project.name}
                      width={600}
                      height={450}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={project.dataAiHint}
                  />
              ) : null}
          </CardHeader>
          <CardContent className="p-4 flex-grow flex items-center justify-between">
              <h4 className="font-headline text-lg flex-grow">{project.name}</h4>
              {(project.link || project.pdf) && <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />}
          </CardContent>
      </Card>
    );

    if (project.link || project.pdf) {
      return (
        <a href={project.link || project.pdf} target="_blank" rel="noopener noreferrer" className="block h-full">
            {cardContent}
        </a>
      );
    }

    return (
      <Link href={`/services/${serviceId}`} className="block h-full">
          {cardContent}
      </Link>
    );
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
                                      <ProjectCard project={project} serviceId={service.id} />
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
