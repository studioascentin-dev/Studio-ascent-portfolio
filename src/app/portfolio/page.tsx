
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Youtube } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

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

export default function VideoPortfolioPage() {
  return (
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
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
