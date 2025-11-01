
"use client";

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LifeBuoy, Apple, Star, Check } from 'lucide-react';
import { storeItems } from '@/lib/store-data';
import Link from 'next/link';

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


const StoreItemCard = ({ item }: { item: any }) => {
  const isPlugin = 'price' in item;

  return (
    <motion.article variants={itemVariants} className="h-full">
      <Link href={`/store/${item.slug}`} className="block h-full group">
        <Card className="flex flex-col h-full bg-secondary/50 backdrop-blur-sm border-white/10 shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-primary/20">
          <CardHeader className="p-0 aspect-video overflow-hidden relative">
            <Image
              src={item.image}
              alt={item.name}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint}
            />
            
            {item.discount && isPlugin && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {item.discount}
              </div>
            )}
            
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
            <h3 className="text-base font-bold font-headline mb-2 flex-grow group-hover:text-primary transition-colors">{item.name}</h3>

            <div className="mt-auto space-y-3">
              {isPlugin && (
                <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                    {item.platform === 'Mac & Windows' ? <Check className="h-3 w-3 text-green-400" /> : <Apple className="h-3 w-3" />} {item.platform}
                </div>
              )}

              {isPlugin ? (
                 <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-primary">₹{item.price}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice}</span>
                    </div>
                    <Button className="w-full md:w-auto font-semibold pointer-events-none text-xs px-3 h-8 mt-2 md:mt-0" size="sm">
                        View Details
                    </Button>
                </div>
              ) : (
                <Button className="w-full font-semibold pointer-events-none text-xs px-3 h-8 mt-2" size="sm">
                    View Details
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
  );
};


const AfterEffectsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M31.25 6.6C30.05 3.9 27.2 2.1 24.2 2.1C20.6 2.1 17.85 4.35 16.7 7.85L12.95 20.9H18.05L19.2 16.85C20.15 14.1 22.05 12.8 24.2 12.8C25.9 12.8 27.25 13.7 27.9 15.35L22.25 28.55C21.1 31.9 18.25 34.05 14.85 34.05C11.35 34.05 8.5 31.8 7.4 28.3L11.1 15.25H6L2 28.4C3.15 31.95 6.05 34.2 9.5 34.2C13.1 34.2 15.95 31.95 17.1 28.45L20.85 15.4H15.75L14.6 19.3C13.65 22.05 11.75 23.35 9.5 23.35C7.8 23.35 6.45 22.45 5.8 20.8L11.55 7.6C12.7 4.25 15.55 2.1 18.95 2.1C22.45 2.1 25.3 4.35 26.4 7.85L22.7 20.9H27.8L31.25 11.75H36L31.25 6.6Z" fill="url(#paint0_linear_1_2)"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="2" y1="18.175" x2="36" y2="18.175" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F06"/>
                <stop offset="1" stopColor="#8338EC"/>
            </linearGradient>
        </defs>
    </svg>
);


export default function StorePage() {
  const storeCategories = {
    plugins: {
      title: 'After Effects Plugins',
      items: storeItems.plugins,
    },
    projectFiles: {
      title: 'Project files [Youtube and Instagram]',
      items: storeItems.projectFiles,
    },
    applications: {
      title: 'Applications',
      items: storeItems.applications,
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-24">
        <motion.section
          className="py-16 md:py-24"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.header variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter">
                Digital Product Store
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-xl/relaxed text-muted-foreground">
                High-quality plugins, templates, and applications to level up your creative projects.
              </p>
            </motion.header>

            {Object.entries(storeCategories).map(([key, category]) => {
              if (!category.items || category.items.length === 0) return null;
              return (
                <motion.section key={key} variants={sectionVariants} className="mb-16 md:mb-20" aria-labelledby={`${key}-heading`}>
                  <motion.h2 variants={itemVariants} id={`${key}-heading`} className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-bold font-headline mb-8 capitalize">
                    {key === 'plugins' && <AfterEffectsIcon className="w-8 h-8 md:w-9 md:h-9" />}
                    {category.title}
                  </motion.h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {category.items.map((item: any) => (
                      <StoreItemCard key={item.slug} item={item} />
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
