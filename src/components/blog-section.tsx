
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const recentPosts = [
    { 
      slug: 'first-post',
      title: 'The Art of Minimalist Web Design', 
      image: 'https://picsum.photos/600/400',
      dataAiHint: 'minimalist design',
      category: 'Web Design',
      href: '/blog'
    },
    { 
      slug: 'second-post',
      title: '5 Reasons to Choose Next.js',
      image: 'https://picsum.photos/600/400',
      dataAiHint: 'code editor',
      category: 'Web Development',
      href: '/blog'
    },
    { 
      slug: 'third-post',
      title: 'Mastering Color Theory in UI/UX', 
      image: 'https://picsum.photos/600/400',
      dataAiHint: 'color palette',
      category: 'UI/UX Design',
      href: '/blog'
    },
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
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

export function BlogSection() {
    return (
        <section id="blog" className="py-24 md:py-32 bg-background">
            <motion.div
                className="container mx-auto px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl"
                    >
                        From the <span className="text-primary">Blog</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        I write about design, development, and my journey as a creator.
                    </motion.p>
                </div>

                <motion.div
                    variants={sectionVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {recentPosts.map((post: any) => (
                        <motion.div
                            key={post.slug}
                            variants={itemVariants}
                        >
                            <Link href={post.href} className="block h-full group">
                                <Card className="flex flex-col h-full bg-card shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-primary/20">
                                    <CardHeader className="p-0 aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            width={600}
                                            height={450}
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            data-ai-hint={post.dataAiHint}
                                        />
                                    </CardHeader>
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <p className="text-sm font-medium text-primary mb-2">{post.category}</p>
                                        <h3 className="font-headline text-xl font-bold flex-grow">{post.title}</h3>
                                        <div className="flex items-center text-primary font-semibold text-sm group-hover:underline mt-4">
                                            Read More <ExternalLink className="ml-2 h-4 w-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div variants={itemVariants} className="text-center mt-16">
                    <Button asChild size="lg">
                        <Link href="/blog">
                            View All Posts <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
