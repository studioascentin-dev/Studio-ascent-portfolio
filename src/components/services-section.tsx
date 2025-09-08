
"use client";

import { Video, Camera, Presentation, Code, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const services = [
  {
    id: 'video-editing',
    icon: <Video className="h-10 w-10 text-primary" />,
    title: 'Video Editing',
    description: 'Professional video editing for brand films, social media ads, and more to engage your audience.',
  },
  {
    id: 'photo-editing',
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Photo Editing',
    description: 'High-quality photo retouching and manipulation to make your images look stunning and professional.',
  },
  {
    id: 'ui-ux-design',
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'UI/UX Design',
    description: 'Compelling visuals that tell a story, define a brand, and capture attention, from logos to brand identities.',
  },
  {
    id: 'web-development',
    icon: <Code className="h-10 w-10 text-primary" />,
    title: 'Web Development',
    description: 'Robust, scalable, and high-performance websites and applications tailored to your business needs.',
  },
  {
    id: 'something-else',
    icon: <PenTool className="h-10 w-10 text-primary" />,
    title: 'Something Else?',
    description: 'Have a different creative or technical need? Reach out and let\'s see how I can help you.',
  },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};


export function ServicesSection() {
  const topServices = services.slice(0, 3);
  const bottomServices = services.slice(3);

  return (
    <section id="services" className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-4">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <motion.h2 variants={itemVariants} className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl">
                    My <span className="text-primary">Services</span>
                </motion.h2>
                <motion.p variants={itemVariants} className="text-muted-foreground md:text-xl/relaxed mt-6">
                    I provide a wide range of digital services to bring your vision to life.
                </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
                {topServices.map((service) => (
                    <motion.div key={service.id} variants={itemVariants}>
                      <Link href={service.id === 'something-else' ? '#contact' : `/services/${service.id}`} className="block h-full">
                        <Card className="h-full bg-secondary/80 text-center p-8 hover:-translate-y-2 transition-transform duration-300 hover:bg-primary/10">
                          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            {service.icon}
                          </div>
                          <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold font-headline text-primary">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 mt-4">
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="grid sm:grid-cols-2 gap-8 w-full lg:w-2/3">
                {bottomServices.map((service) => (
                    <motion.div key={service.id} variants={itemVariants}>
                      <Link href={service.id === 'something-else' ? '#contact' : `/services/${service.id}`} className="block h-full">
                        <Card className="h-full bg-secondary/80 text-center p-8 hover:-translate-y-2 transition-transform duration-300 hover:bg-primary/10">
                          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                            {service.icon}
                          </div>
                          <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold font-headline text-primary">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 mt-4">
                            <p className="text-muted-foreground">{service.description}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                ))}
              </div>
            </motion.div>

        </div>
    </section>
  );
}
