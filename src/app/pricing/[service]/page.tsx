

"use client";

import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import Link from 'next/link';

const pricingData = {
  'photo-editing': {
    title: 'Photo Editing',
    tiers: [
      { 
        name: 'Basic', 
        price: '₹399', 
        period: '/5 photos', 
        features: ['Basic Retouching', 'Color Correction', '1 Round of Revisions'], 
        single: { price: '₹99', name: 'Single Photo Edit' },
        images: ['https://picsum.photos/400/300'],
        dataAiHint: ['basic retouch'],
        whatsapp: {
          package: "Hi! 👋 I'm interested in the Basic Photo Editing Package (₹399 for 5 photos). I'd like basic retouching and color correction. Please let me know how to proceed and where to send the photos. Thanks!",
          single: "Hello! I’d like to get 1 photo edited under the Basic Plan (₹99). Just need simple retouching and color correction. Let me know what’s next!"
        }
      },
      { 
        name: 'Intermediate', 
        price: '₹999', 
        period: '/10 photos', 
        features: ['Advanced Retouching', 'Color Grading', 'Background Removal', '2 Rounds of Revisions'], 
        single: { price: '₹199', name: 'Single Photo Edit' },
        images: ['https://picsum.photos/400/300'],
        dataAiHint: ['advanced retouch'],
        whatsapp: {
            package: "Hello! I'd like to go ahead with the Intermediate Photo Editing Package (₹999 for 10 photos). I need advanced retouching, color grading, and background removal. Let me know what you need from my side and how to start. 😊",
            single: "Hi! I’d like to use the Intermediate Plan for a single photo (₹199). I want advanced retouching with background removal. Please share the details!"
        }
      },
      { 
        name: 'Pro', 
        price: '₹1,999', 
        period: '/5 photos', 
        features: ['High-End Retouching', 'Complex Manipulations', 'Source Files', '3 Rounds of Revisions'], 
        single: { price: '₹399', name: 'Single Photo Edit' },
        images: ['https://picsum.photos/400/300'],
        dataAiHint: ['high-end retouching'],
        whatsapp: {
            package: "Hi there! I'm ready to start with the Pro Photo Editing Package (₹1,999 for 5 photos). I'm looking for high-end retouching and complex manipulations. What's the next step?",
            single: "Hey! I’m looking for Pro-level single photo editing (₹399). I need high-end retouching and complex edits. Can you tell me how to proceed?"
        }
      },
    ]
  },
  'video-editing': {
    title: 'Video Editing',
    tiers: [
      { name: 'Basic', price: '₹3,000', period: '/5 min video', features: ['Up to 5 min video', 'Basic Cuts & Transitions', 'Royalty-Free Music', '1 Round of Revisions'] },
      { name: 'Intermediate', price: '₹8,000', period: '/10 min video', features: ['Up to 10 min video', 'Advanced Transitions', 'Basic Color Grading', '2 Rounds of Revisions'] },
      { name: 'Pro', price: '₹20,000', period: '/20 min video', features: ['Up to 20 min video', 'Custom Animations & VFX', 'Advanced Color Grading', '3 Rounds of Revisions'] },
    ]
  },
  'ppt-design': {
    title: 'PPT Design',
    tiers: [
      { name: 'Basic', price: '₹2,500', period: '/deck', features: ['Up to 10 Slides', 'Template-based Design', '2 Rounds of Revisions'] },
      { name: 'Intermediate', price: '₹6,000', period: '/deck', features: ['Up to 20 Slides', 'Custom Branded Template', 'Infographics & Charts', '3 Rounds of Revisions'] },
      { name: 'Pro', price: '₹12,000', period: '/deck', features: ['Up to 35 Slides', 'Full Custom Design', 'Advanced Animations', 'Source Files'] },
    ]
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    tiers: [
      { name: 'Basic', price: '₹4000', period: '', features: ['1 Logo Concept', '2 Rounds of Revisions', 'JPG & PNG Files'] },
      { name: 'Intermediate', price: '₹10,000', period: '', features: ['3 Logo Concepts', 'Social Media Kit', 'Vector Files', '3 Rounds of Revisions'] },
      { name: 'Pro', price: '₹20,000', period: '', features: ['5 Logo Concepts', 'Full Brand Style Guide', 'Stationery Designs', 'Source Files (AI, EPS)'] },
    ]
  },
  'web-development': {
    title: 'Web Development',
    tiers: [
      { name: 'Basic', price: '₹20,000', period: '', features: ['Landing Page Dev', 'Next.js', 'Basic CMS', '1 Month Support'] },
      { name: 'Intermediate', price: '₹60,000', period: '', features: ['Everything in Web Design Pro', 'Full-stack Development', 'Advanced CMS', '2 Months Support'] },
      { name: 'Pro', price: '₹1,20,000+', period: '', features: ['Complex Web Application', 'API Integrations', 'E-commerce Functionality', '3 Months Support'] },
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

type Tier = (typeof pricingData)['photo-editing']['tiers'][0] | (typeof pricingData)['video-editing']['tiers'][0];


export default function ServicePricingPage() {
  const params = useParams();
  const serviceId = params.service as string;
  const data = pricingData[serviceId as keyof typeof pricingData];
  const phoneNumber = "919707191619"; 

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<Tier | null>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<'package' | 'single'>('package');

  if (!data) {
    notFound();
  }
  
  const handleGetStartedClick = (tier: Tier) => {
    if (serviceId === 'photo-editing') {
        setSelectedTier(tier);
        setSelectedPlan('package');
        setIsDialogOpen(true);
    } else {
        const message = `Hello! I'm interested in the ${tier.name} package for ${data.title}. I'd like to discuss a project.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContinue = () => {
    if (!selectedTier || !('whatsapp' in selectedTier)) return;

    const message = (selectedTier as any).whatsapp[selectedPlan];
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsDialogOpen(false);
  };
  
  const singlePhotoFeature = (tier: Tier) => {
    if (serviceId === 'photo-editing' && 'single' in tier) {
        return `Single photo editing @ ${(tier as any).single.price}`
    }
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 pt-24">
            <section className="py-16 md:py-24">
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
                        className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-16 items-start max-w-5xl mx-auto"
                    >
                    {(data.tiers as Tier[]).map((tier, tierIndex) => (
                        <motion.div 
                            key={tier.name} 
                            variants={cardVariants} 
                            className="flex flex-col h-full"
                        >
                            {'images' in tier && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-headline text-center mb-4">{tier.name} Example</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {(tier as any).images.map((image: string, index: number) => (
                                            <Image
                                                key={index}
                                                src={image}
                                                alt={`${tier.name} example ${index + 1}`}
                                                width={400}
                                                height={300}
                                                className="w-full h-auto object-cover rounded-md shadow-md"
                                                data-ai-hint={(tier as any).dataAiHint[index]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            <motion.div
                                className="flex h-full"
                                whileHover={{ y: -8, scale: 1.03 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Card className={cn(
                                    "flex flex-col w-full bg-card/80 transition-all duration-300 hover:shadow-lg overflow-hidden",
                                    "hover:border-primary hover:ring-2 hover:ring-primary hover:shadow-primary/20"
                                )}>
                                    <CardHeader className="text-center pb-4 pt-6">
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
                                            {singlePhotoFeature(tier) && (
                                                <li className="flex items-start gap-3">
                                                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                                    <span className="text-muted-foreground">{singlePhotoFeature(tier)}</span>
                                                </li>
                                            )}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                    <Button size="lg" className="w-full font-bold" onClick={() => handleGetStartedClick(tier)}>
                                        Get Started
                                    </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </motion.div>
                    ))}
                    </motion.div>

                    <div className="text-center mt-16">
                        <Button asChild variant="outline">
                            <Link href="/pricing">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to All Services
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </section>
        </main>
        {selectedTier && serviceId === 'photo-editing' && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Choose Your Plan</DialogTitle>
                        <DialogDescription>
                           Select the option that best fits your needs for the {selectedTier.name} plan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <RadioGroup defaultValue={selectedPlan} onValueChange={(val) => setSelectedPlan(val as 'package' | 'single')}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="package" id="package" />
                                <Label htmlFor="package" className="cursor-pointer">{selectedTier.name} Package ({selectedTier.price}{selectedTier.period})</Label>
                            </div>
                            {'single' in selectedTier && (
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="single" id="single" />
                                    <Label htmlFor="single" className="cursor-pointer">{(selectedTier as any).single.name} ({(selectedTier as any).single.price}/photo)</Label>
                                </div>
                            )}
                        </RadioGroup>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleContinue} className="w-full">Continue to WhatsApp</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
        <Footer />
    </div>
  );
}
