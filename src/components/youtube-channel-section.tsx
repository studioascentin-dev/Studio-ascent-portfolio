
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Youtube } from 'lucide-react';
import { Card } from './ui/card';

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

export function YouTubeChannelSection() {
    const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@D3Vedits";

    return (
        <section id="youtube-channel" className="py-24 md:py-32">
            <motion.div 
                className="container mx-auto px-4"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div 
                    variants={itemVariants}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter">
                        Check Out My <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-600">YouTube</span> Channel
                    </h2>
                    <p className="mt-4 md:mt-6 text-muted-foreground md:text-lg">
                        Dive into tutorials, creative edits, and behind-the-scenes content.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
                    <Card className="overflow-hidden group shadow-lg border-border hover:border-primary transition-all duration-300">
                        <Link href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                            <div className="relative aspect-video">
                                <Image
                                    src="/images/youtubechannel.png"
                                    alt="YouTube Channel Preview"
                                    width={1280}
                                    height={720}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint="youtube channel screenshot"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Youtube className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </Link>
                    </Card>
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-center mt-12">
                    <Button asChild size="lg" className="font-bold">
                        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                            Visit Channel <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
