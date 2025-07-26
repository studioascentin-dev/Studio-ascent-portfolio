
"use client";

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const pricingTiers = [
  {
    name: 'Photo Editing',
    price: '₹2,000',
    period: '/ 10 photos',
    description: 'Perfect for enhancing your product shots, portraits, and social media content.',
    features: [
      'Advanced Retouching',
      'Color Correction & Grading',
      'Background Removal',
      '2 Rounds of Revisions',
    ],
    buttonText: 'Get Started',
    isFeatured: false,
  },
  {
    name: 'Video Editing',
    price: '₹5,000',
    period: '/ minute',
    description: 'Ideal for creating engaging short-form content like reels and ads.',
    features: [
      'Professional Cutting & Pacing',
      'Basic Color Grading',
      'Royalty-Free Music',
      '2 Rounds of Revisions',
    ],
    buttonText: 'Choose Plan',
    isFeatured: false,
  },
  {
    name: 'PPT Design',
    price: '₹10,000',
    period: '/ presentation',
    description: 'For compelling pitch decks, webinars, and corporate presentations.',
    features: [
      'Custom Branded Template',
      'Up to 20 Slides',
      'Infographics & Charts',
      '3 Rounds of Revisions',
    ],
    buttonText: 'Choose Plan',
    isFeatured: false,
  },
  {
    name: 'Web Design',
    price: '₹25,000',
    period: '/ project',
    description: 'A complete, beautiful, and user-friendly website design.',
    features: [
      'Up to 5 Pages UI/UX Design',
      'Responsive Mobile-First Design',
      'Interactive Prototypes',
      'Source Files (Figma)',
    ],
    buttonText: 'Choose Pro',
    isFeatured: true,
  },
  {
    name: 'Web Development',
    price: '₹50,000',
    period: '/ project',
    description: 'Robust and scalable websites built with the latest technology.',
    features: [
      'Everything in Web Design',
      'Next.js Development',
      'Content Management System',
      '1 Month of Support',
    ],
    buttonText: 'Contact Sales',
    isFeatured: false,
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

const cardVariants = {
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

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={cardVariants}
            className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
          >
            My Pricing
          </motion.h2>
          <motion.p 
            variants={cardVariants}
            className="mt-6 text-muted-foreground md:text-xl/relaxed"
          >
            Simple, transparent pricing for every creative need. Choose the plan that fits you best.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start max-w-7xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={cardVariants} className="flex h-full">
              <Card className={cn("flex flex-col w-full", tier.isFeatured ? "border-primary ring-2 ring-primary shadow-lg" : "bg-card/80")}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl md:text-2xl font-headline mb-2">{tier.name}</CardTitle>
                  <CardDescription className="px-6 h-12">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center p-6">
                  <div className="mb-8 text-center">
                    <span className="text-4xl md:text-5xl font-bold tracking-tighter">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 text-sm w-full flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className={cn("w-full font-bold", !tier.isFeatured && "bg-secondary text-secondary-foreground")}>
                    {tier.buttonText}
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
