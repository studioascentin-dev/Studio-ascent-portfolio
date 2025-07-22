
"use client";

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedSection } from '@/components/animated-section';
import { motion } from 'framer-motion';

const pricingTiers = [
  {
    name: 'Content Focus',
    price: '₹15,000',
    description: 'Perfect for individuals and startups needing high-quality content.',
    features: ['Choose 1: Video, Photo, or PPT', 'Standard Delivery (7 days)', 'Basic Support'],
    isPopular: false,
  },
  {
    name: 'Web Pro',
    price: '₹40,000',
    description: 'Ideal for businesses looking to establish a strong online presence.',
    features: ['Web Design & Development', 'Priority Delivery (5 days)', 'Source Files', 'Priority Support'],
    isPopular: true,
  },
  {
    name: 'Full Suite',
    price: 'Custom',
    description: 'Comprehensive solutions for brands that need it all.',
    features: ['All Services Included', 'Dedicated Project Manager', 'Custom Timelines', 'Full Licensing & Ownership'],
    isPopular: false,
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
            staggerChildren: 0.15,
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

export function PricingSection() {
  return (
    <AnimatedSection id="pricing">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Our Pricing</motion.h2>
            <motion.p variants={itemVariants} className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose a plan that works for you. Simple, transparent pricing for every need.
            </motion.p>
          </div>
        </motion.div>
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
        >
          {pricingTiers.map((tier) => (
            <motion.div key={tier.name} variants={cardVariants}>
              <Card className={`flex flex-col ${tier.isPopular ? 'border-primary border-2 shadow-2xl' : ''} bg-card h-full`}>
                <CardHeader className="text-center">
                  {tier.isPopular && <div className="text-sm font-semibold text-primary uppercase">Most Popular</div>}
                  <CardTitle className="text-3xl font-headline mt-2">{tier.name}</CardTitle>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold font-headline text-primary">{tier.price}</span>
                    {tier.name !== 'Full Suite' && <span className="text-muted-foreground">/project</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-bold text-lg py-6 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
