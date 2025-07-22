
"use client";

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const pricingTiers = [
  {
    name: 'Starter',
    price: '₹8,000',
    period: '/ project',
    description: 'Perfect for individuals and small projects getting off the ground.',
    features: [
      'Basic Video/Photo Editing',
      'Simple PPT Design (up to 15 slides)',
      '1 Round of Revisions',
      'Standard Turnaround Time',
    ],
    buttonText: 'Get Started',
    isFeatured: false,
  },
  {
    name: 'Pro',
    price: '₹20,000',
    period: '/ project',
    description: 'Ideal for startups and businesses needing professional-grade assets.',
    features: [
      'Advanced Video/Photo Editing',
      'Custom Web Design (up to 5 pages)',
      'Interactive PPT Design',
      '3 Rounds of Revisions',
      'Faster Turnaround Time',
      'Source Files Included',
    ],
    buttonText: 'Choose Pro',
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: '₹45,000+',
    period: '/ month',
    description: 'Comprehensive solutions for established businesses and ongoing needs.',
    features: [
      'Full-scale Web Development',
      'Dedicated Project Management',
      'Unlimited Revisions',
      'Priority Support (24/7)',
      'Monthly Retainer for all services',
      'Custom Analytics & Reporting'
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div key={tier.name} variants={cardVariants}>
              <Card className={cn("flex flex-col h-full", tier.isFeatured ? "border-primary ring-2 ring-primary shadow-lg" : "bg-card/80")}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-headline mb-2">{tier.name}</CardTitle>
                  <CardDescription className="px-6">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow items-center p-6">
                  <div className="mb-8 text-center">
                    <span className="text-5xl font-bold tracking-tighter">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                  <ul className="space-y-4 text-sm w-full">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500" />
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
