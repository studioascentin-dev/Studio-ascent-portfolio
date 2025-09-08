
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';


const blogPosts = [
  {
    slug: 'first-post',
    title: 'The Art of Minimalist Web Design',
    description: 'Discover how stripping back the non-essentials can lead to more impactful and user-friendly websites.',
    date: 'July 26, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'minimalist design',
  },
  {
    slug: 'second-post',
    title: '5 Reasons to Choose Next.js for Your Next Project',
    description: 'A deep dive into the powerful features of Next.js that make it a top choice for modern web development.',
    date: 'July 22, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'code editor',
  },
  {
    slug: 'third-post',
    title: 'Mastering Color Theory in UI/UX',
    description: 'Learn the fundamentals of color theory and how to apply them to create visually stunning and effective user interfaces.',
    date: 'July 18, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'color palette',
  },
   {
    slug: 'fourth-post',
    title: 'A Guide to High-End Photo Retouching',
    description: 'Techniques and tips for achieving professional, high-end results in your photo editing workflow.',
    date: 'July 15, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'photo retouching',
  },
  {
    slug: 'fifth-post',
    title: 'The Power of Storytelling in Video Editing',
    description: 'Explore how narrative techniques can transform your video content from simple clips to compelling stories.',
    date: 'July 11, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'video editing',
  },
  {
    slug: 'sixth-post',
    title: 'Creating Engaging Presentations with PPT Design',
    description: 'Move beyond bullet points. Tips for designing presentations that captivate and persuade your audience.',
    date: 'July 07, 2024',
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'presentation slide',
  },
];


const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1,
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

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <motion.section 
            className="py-24 md:py-32"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                From the <span className="text-primary">Blog</span>
              </h1>
              <p className="mt-6 text-muted-foreground md:text-xl/relaxed">
                Thoughts on design, development, and the digital world.
              </p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={sectionVariants}
            >
              {blogPosts.map((post) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <Link href={`/blog/#`} className="block h-full group">
                    <Card className="flex flex-col h-full bg-card/80 shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-primary/20">
                      <CardHeader className="p-0 aspect-[4/3] overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                          data-ai-hint={post.dataAiHint}
                        />
                      </CardHeader>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                        <h3 className="text-xl font-bold font-headline mb-3 flex-grow">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">{post.description}</p>
                        <div className="flex items-center text-primary font-semibold text-sm group-hover:underline">
                            Read More <ExternalLink className="ml-2 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-16">
                <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </motion.div>

          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
