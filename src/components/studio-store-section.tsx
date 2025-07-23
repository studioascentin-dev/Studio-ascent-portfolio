
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const products = [
  {
    title: 'Modern Portfolio Website Template',
    category: 'Web Template',
    description: 'A sleek, modern, and fully responsive Next.js template for creatives and professionals.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'website template',
    tags: ['Next.js', 'React', 'Tailwind CSS']
  },
  {
    title: 'Cinematic LUTs Pack',
    category: 'Photoshop Presets',
    description: 'A collection of 15 professional color grading presets for Photoshop to give your photos a cinematic look.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'color presets',
    tags: ['Photoshop', 'LUTs', 'Color Grading']
  },
  {
    title: 'Corporate Web Design System',
    category: 'Web Design',
    description: 'A complete Figma design system for corporate websites, including components, icons, and styles.',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'design system',
    tags: ['Figma', 'UI Kit', 'Web Design']
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

export function StudioStoreSection() {
  return (
    <section id="studio-store" className="py-24 md:py-32 bg-secondary/30">
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
            Welcome to the Studio Store
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-muted-foreground md:text-xl/relaxed"
          >
            Browse my collection of pre-built digital products to kickstart your next project.
          </motion.p>
        </div>

        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="flex flex-col h-full bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-primary/20 transition-shadow duration-300 overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={product.dataAiHint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <p className="text-sm font-medium text-primary mb-1">{product.category}</p>
                  <CardTitle className="text-2xl font-headline mb-3">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground flex-grow">{product.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {product.tags.map(tag => (
                       <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-4">
                  <Button className="w-full">
                    Request this Product
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
