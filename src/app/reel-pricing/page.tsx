
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Check, Clock, Star } from 'lucide-react';
import Link from 'next/link';

const reelPricingData = [
  {
    title: "Candy Style Edit",
    price: "₹700 – ₹2,000",
    features: [
      "Soft pastel color grading",
      "Dreamy transitions & beat sync",
      "Up to 45 sec (1080p export)",
      "1 free revision",
    ],
    delivery: "2–3 Days",
    addOns: [
      "Extra 10 sec @ ₹150",
      "Express Delivery +₹300",
    ],
    popular: false,
    color: "pink",
  },
  {
    title: "Slo-Mo / Velocity Edit",
    price: "₹1,000 – ₹2,800",
    features: [
      "Smooth slow motion (Twixtor-style)",
      "Beat-perfect velocity transitions",
      "Emotional color tone",
      "1–2 revisions",
    ],
    delivery: "3–4 Days",
    addOns: [
        "Extra 10 sec @ ₹200",
        "Express Delivery +₹400",
    ],
    popular: true,
    color: "purple",
  },
  {
    title: "Glitch & Sync Edit",
    price: "₹900 – ₹2,500",
    features: [
      "Advanced beat sync effects",
      "Glitch overlays & motion text",
      "Perfect for dance or anime",
      "2 revisions",
    ],
    delivery: "4–5 Days",
    addOns: [
      "Extra 10 sec @ ₹200",
      "Express Delivery +₹500",
    ],
    popular: false,
    color: "green",
  },
  {
    title: "Trendy Reel Edit",
    price: "₹500 – ₹1,800",
    features: [
      "Trend audio & captions",
      "Modern transitions",
      "Optimized for Instagram Reels",
      "1 revision",
    ],
    delivery: "2 Days",
    addOns: [
      "Extra 10 sec @ ₹100",
      "Express Delivery +₹300",
    ],
    popular: false,
    color: "yellow",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const cardColors = {
  pink: "shadow-pink-500/20 hover:border-pink-500/80",
  purple: "shadow-primary/20 hover:border-primary/80",
  green: "shadow-green-500/20 hover:border-green-500/80",
  yellow: "shadow-yellow-500/20 hover:border-yellow-500/80",
};

export default function ReelPricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground" style={{ backgroundColor: '#0F0F0F' }}>
      <Header />
      <main className="flex-1 pt-24" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <motion.section
          className="container mx-auto px-4 md:px-6"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter text-white">
              Reel Editing Packages
            </h1>
            <p className="mt-4 md:mt-5 text-base md:text-lg/relaxed text-[#E0E0E0]/80">
              Choose your edit style — crafted to match your vibe.
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"
          >
            {reelPricingData.map((tier) => (
              <motion.div
                key={tier.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="h-full"
              >
                <div className={`relative flex flex-col h-full rounded-2xl bg-black/50 border border-white/10 p-6 transition-all duration-300 ${cardColors[tier.color as keyof typeof cardColors]} shadow-lg hover:shadow-2xl`}>
                  {tier.popular && (
                    <Badge variant="default" className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#7C4DFF] text-white">
                      Most Popular
                    </Badge>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold font-headline text-white mb-2">{tier.title}</h3>
                    <p className="text-3xl font-semibold text-white mb-6">{tier.price}</p>
                    
                    <ul className="space-y-3 text-sm text-[#E0E0E0]">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-[#7C4DFF]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center gap-3 mt-4 text-sm text-[#E0E0E0]">
                       <Clock className="h-4 w-4 text-[#7C4DFF]" />
                       <span>Delivery: {tier.delivery}</span>
                    </div>

                    <div className="mt-6 text-sm text-[#E0E0E0]/80">
                        <p className="font-semibold text-white/90 mb-2">Add-Ons:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {tier.addOns.map((addOn, i) => <li key={i}>{addOn}</li>)}
                        </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button className="w-full font-bold bg-[#7C4DFF] text-white hover:bg-[#6B3FD9]">
                      Select Plan
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-[#E0E0E0]/70">
              Need a custom project? <Link href="/#contact" className="text-[#7C4DFF] hover:underline">Contact for personalized pricing.</Link>
            </p>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
