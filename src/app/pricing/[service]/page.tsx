
"use client";

import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';

const pricingData = {
  'photo-editing': {
    title: 'Photo Editing',
    tiers: [
      { name: 'Basic', price: '₹399', period: '/5 photos', features: ['Basic Retouching', 'Color Correction', '1 Round of Revisions', 'Single photo editing @ ₹99'], isFeatured: false },
      { name: 'Intermediate', price: '₹999', period: '/10 photos', features: ['Advanced Retouching', 'Color Grading', 'Background Removal', '2 Rounds of Revisions', 'Single photo editing @ ₹199'], isFeatured: true },
      { name: 'Pro', price: '₹1,999', period: '/5 photos', features: ['High-End Retouching', 'Complex Manipulations', 'Source Files', '3 Rounds of Revisions', 'Single photo editing @ ₹399'], isFeatured: false },
    ]
  },
  'video-editing': {
    title: 'Video Editing',
    tiers: [
      { name: 'Basic', price: '₹3,000', period: '/min', features: ['Up to 1 min video', 'Basic Cuts & Transitions', 'Royalty-Free Music', '1 Round of Revisions'], isFeatured: false },
      { name: 'Intermediate', price: '₹7,500', period: '/min', features: ['Up to 3 min video', 'Advanced Transitions', 'Basic Color Grading', '2 Rounds of Revisions'], isFeatured: true },
      { name: 'Pro', price: '₹15,000', period: '/min', features: ['Up to 5 min video', 'Custom Animations & VFX', 'Advanced Color Grading', '3 Rounds of Revisions'], isFeatured: false },
    ]
  },
  'ppt-design': {
    title: 'PPT Design',
    tiers: [
      { name: 'Basic', price: '₹2,500', period: '/deck', features: ['Up to 10 Slides', 'Template-based Design', '2 Rounds of Revisions'], isFeatured: false },
      { name: 'Intermediate', price: '₹6,000', period: '/deck', features: ['Up to 20 Slides', 'Custom Branded Template', 'Infographics & Charts', '3 Rounds of Revisions'], isFeatured: true },
      { name: 'Pro', price: '₹12,000', period: '/deck', features: ['Up to 35 Slides', 'Full Custom Design', 'Advanced Animations', 'Source Files'], isFeatured: false },
    ]
  },
  'web-design': {
    title: 'Web Design',
    tiers: [
      { name: 'Basic', price: '₹10,000', period: '', features: ['1-Page Landing Page', 'Responsive Design', '2 Rounds of Revisions'], isFeatured: false },
      { name: 'Intermediate', price: '₹25,000', period: '', features: ['Up to 5 Pages', 'UI/UX Design', 'Interactive Prototypes', '3 Rounds of Revisions'], isFeatured: true },
      { name: 'Pro', price: '₹50,000', period: '', features: ['Up to 10 Pages', 'Complete Design System', 'Advanced Animations', 'Source Files (Figma)'], isFeatured: false },
    ]
  },
  'web-development': {
    title: 'Web Development',
    tiers: [
      { name: 'Basic', price: '₹20,000', period: '', features: ['Landing Page Dev', 'Next.js', 'Basic CMS', '1 Month Support'], isFeatured: false },
      { name: 'Intermediate', price: '₹60,000', period: '', features: ['Everything in Web Design Pro', 'Full-stack Development', 'Advanced CMS', '2 Months Support'], isFeatured: true },
      { name: 'Pro', price: '₹1,20,000+', period: '', features: ['Complex Web Application', 'API Integrations', 'E-commerce Functionality', '3 Months Support'], isFeatured: false },
    ]
  }
};

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

export default function ServicePricingPage() {
  const params = useParams();
  const serviceId = params.service as string;
  const data = pricingData[serviceId as keyof typeof pricingData];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
        <main className="flex-1">
            <section className="py-24 md:py-32">
                <motion.div 
                    className="container mx-auto px-4 md:px-6"
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                >
                    <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2 
                        variants={cardVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
                    >
                        {data.title} Pricing
                    </motion.h2>
                    <motion.p 
                        variants={cardVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        Choose the perfect plan for your needs. All prices are negotiable.
                    </motion.p>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto"
                    >
                    {data.tiers.map((tier) => (
                        <motion.div 
                            key={tier.name} 
                            variants={cardVariants} 
                            className="flex h-full"
                            whileHover={{ y: -8, scale: 1.03 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Card className={cn(
                                "flex flex-col w-full bg-card/80 transition-all duration-300 hover:shadow-lg",
                                tier.isFeatured ? "border-primary ring-2 ring-primary shadow-primary/20" : "hover:border-primary hover:ring-2 hover:ring-primary hover:shadow-primary/20"
                            )}>
                                <CardHeader className="text-center pb-4">
                                    <CardTitle className="text-2xl md:text-3xl font-headline mb-2">{tier.name}</CardTitle>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-4xl font-bold">{tier.price}</span>
                                        <span className="text-sm text-muted-foreground">{tier.period}</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex flex-col flex-grow items-center p-6 pt-0">
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
                                <Button asChild size="lg" className={cn("w-full font-bold", !tier.isFeatured && "bg-secondary text-secondary-foreground hover:bg-secondary/80")}>
                                    <a href="/#hire-me">Get Started</a>
                                </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                    </motion.div>

                    <div className="text-center mt-16">
                        <Button asChild variant="outline">
                            <a href="/#pricing">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to All Services
                            </a>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
        <Footer />
    </div>
  );
}
