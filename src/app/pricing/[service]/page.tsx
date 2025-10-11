

"use client";

import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowLeft, X, Zap, Database, Cog, Rocket, Shield, Sparkles, Globe, Palette, LayoutDashboard, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription as DialogDescriptionComponent, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import * as React from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';


const webDevFeatures = [
    { name: '1-3 Page Website', basic: true, intermediate: false, pro: false, icon: <Check size={18} className="text-green-500" /> },
    { name: 'Next.js Framework', basic: true, intermediate: true, pro: false, icon: <Zap size={18} className="text-green-500" /> },
    { name: 'Basic CMS Integration', basic: true, intermediate: false, pro: false, icon: <Database size={18} className="text-green-500" /> },
    { name: '1 Month Support', basic: true, intermediate: true, pro: true, icon: <Check size={18} className="text-green-500" /> },

    { name: 'Up to 6 Page Website', basic: false, intermediate: true, pro: false, icon: <Check size={18} className="text-green-500" /> },
    { name: 'Advanced CMS', basic: false, intermediate: true, pro: false, icon: <Database size={18} className="text-green-500" /> },
    { name: 'Simple API Integrations', basic: false, intermediate: true, pro: false, icon: <Cog size={18} className="text-green-500" /> },
    { name: '2 Months Support', basic: false, intermediate: true, pro: false, icon: <Check size={18} className="text-green-500" /> },
    
    { name: '10+ Page Application', basic: false, intermediate: false, pro: true, icon: <Check size={18} className="text-green-500" /> },
    { name: 'Performance Optimization', basic: false, intermediate: false, pro: true, icon: <Rocket size={18} className="text-green-500" /> },
    { name: 'Advanced Security Setup', basic: false, intermediate: false, pro: true, icon: <Shield size={18} className="text-green-500" /> },
    { name: 'AI Feature Integration', basic: false, intermediate: false, pro: true, icon: <Sparkles size={18} className="text-green-500" /> },
    { name: 'Multi-language Support', basic: false, intermediate: false, pro: true, icon: <Globe size={18} className="text-green-500" /> },
    { name: 'UI/UX Premium Design', basic: false, intermediate: false, pro: true, icon: <Palette size={18} className="text-green-500" /> },
    { name: 'Custom Admin Dashboard', basic: false, intermediate: false, pro: true, icon: <LayoutDashboard size={18} className="text-green-500" /> },
    { name: 'Custom Integrations', basic: false, intermediate: false, pro: true, icon: <Puzzle size={18} className="text-green-500" /> },
    { name: '3+ Months Support', basic: false, intermediate: false, pro: true, icon: <Check size={18} className="text-green-500" /> },
];


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
        price: '₹1,499', 
        period: '/5 photos', 
        features: ['Advanced Retouching', 'Color Grading', 'Background Removal', '2 Rounds of Revisions'], 
        single: { price: '₹199', name: 'Single Photo Edit' },
        images: ['https://picsum.photos/400/300'],
        dataAiHint: ['advanced retouch'],
        whatsapp: {
            package: "Hello! I'd like to go ahead with the Intermediate Photo Editing Package (₹1,499 for 5 photos). I need advanced retouching, color grading, and background removal. Let me know what you need from my side and how to start. 😊",
            single: "Hi! I’d like to use the Intermediate Plan for a single photo (₹199). I want advanced retouching with background removal. Please share the details!"
        }
      },
      { 
        name: 'Pro', 
        price: '₹3,999', 
        period: '/5 photos', 
        features: ['High-End Retouching', 'Complex Manipulations', 'Source Files', '3 Rounds of Revisions'], 
        single: { price: '₹399', name: 'Single Photo Edit' },
        images: ['https://picsum.photos/400/300'],
        dataAiHint: ['high-end retouching'],
        whatsapp: {
            package: "Hi there! I'm ready to start with the Pro Photo Editing Package (₹3,999 for 5 photos). I'm looking for high-end retouching and complex manipulations. What's the next step?",
            single: "Hey! I’m looking for Pro-level single photo editing (₹399). I need high-end retouching and complex edits. Can you tell me how to proceed?"
        }
      },
    ]
  },
  'video-editing': {
    title: 'Video Editing',
    tiers: [
      { name: 'Basic', price: '₹5,000', period: '', features: ['Up to 5 min video', 'Basic Cuts & Transitions', 'Royalty-Free Music', '1 Round of Revisions'] },
      { name: 'Intermediate', price: '₹15,000', period: '', features: ['Up to 10 min video', 'Advanced Transitions', 'Basic Color Grading', '2 Rounds of Revisions'] },
      { name: 'Pro', price: '₹50,000', period: '', features: ['Up to 20 min video', 'Custom Animations & VFX', 'Advanced Color Grading', '3 Rounds of Revisions'] },
    ]
  },
  'ai-chatbot': {
    title: 'AI Chatbot for WhatsApp & Business',
    tiers: [
      { name: 'FAQ / Support Bot', price: '₹8,000', period: '', features: ['Handles customer questions (hours, prices, etc.)', 'Works on WhatsApp / Telegram', 'Ideal for shops, restaurants, salons'] },
      { name: 'Order & Booking Bot', price: '₹15,000', period: '', features: ['Customers place orders or book services via chat', 'Collects info into Google Sheets / Airtable', 'Sends owner a notification upon new order/booking'] },
      { name: 'Lead Collection Bot', price: '₹12,000', period: '', features: ['Asks for name, phone, and requirements', 'Saves leads into Google Sheets or CRM', 'Perfect for real estate, coaching, and tutors'] },
      { name: 'AI-Powered GPT Bot', price: '₹25,000', period: '', features: ['Feels like talking to ChatGPT on WhatsApp', 'Provides smart, human-like replies', 'Slightly more costly to run (uses OpenAI credits)'] },
    ]
  },
  'web-development': {
    title: 'Choose the Right Plan for Your Website',
    description: 'Flexible pricing for Next.js web development, designed to scale with your needs.',
    tiers: [
      { 
        name: 'Basic Web Development',
        description: 'Perfect for Small Businesses & Personal Sites',
        price: '₹20,000',
        period: 'Starting at',
        buttonText: 'Start Small',
        features: webDevFeatures.filter(f => f.basic) 
      },
      { 
        name: 'Intermediate Web Development',
        description: 'Best for Growing Startups',
        price: '₹75,000',
        period: 'Starting at',
        popular: true,
        buttonText: 'Grow Your Business',
        features: webDevFeatures.filter(f => f.intermediate)
      },
      { 
        name: 'Enterprise Web Development',
        description: 'Custom Solutions for Enterprises',
        price: '₹1,50,000+',
        period: 'Starting at',
        periodDescription: 'Custom Pricing Available',
        buttonText: 'Build Enterprise Solutions',
        features: webDevFeatures.filter(f => f.pro) 
      },
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

type Tier = (typeof pricingData)['photo-editing']['tiers'][0] | (typeof pricingData)['video-editing']['tiers'][0] | (typeof pricingData)['web-development']['tiers'][0];


export default function ServicePricingPage() {
  const params = useParams();
  const serviceId = params.service as string;
  const data = pricingData[serviceId as keyof typeof pricingData];
  const phoneNumber = "919707191619"; 

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedTier, setSelectedTier] = React.useState<any | null>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<'package' | 'single'>('package');

  if (!data) {
    notFound();
  }
  
  const handleGetStartedClick = (tier: any) => {
    if (serviceId === 'photo-editing') {
        setSelectedTier(tier);
        setSelectedPlan('package');
        setIsDialogOpen(true);
    } else {
        const message = `Hello! I'm interested in the ${tier.name} package for ${data.title}. I'dlike to discuss a project.`;
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

  const gridColsClass = serviceId === 'ai-chatbot' ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  if (serviceId === 'web-development') {
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
                                {data.title}
                            </motion.h2>
                            <motion.p
                                variants={cardVariants}
                                className="mt-4 text-muted-foreground md:text-xl/relaxed"
                            >
                                {data.description}
                            </motion.p>
                        </div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto"
                        >
                            {(data.tiers as any[]).map((tier) => (
                                <motion.div
                                    key={tier.name}
                                    variants={cardVariants}
                                    className="h-full"
                                >
                                    <Card className={cn(
                                        "flex flex-col w-full h-full bg-card backdrop-blur-sm border-white/20 transition-all duration-300 rounded-lg shadow-md",
                                        tier.popular ? "border-orange-500 ring-2 ring-orange-500" : "border-border"
                                    )}>
                                        {tier.popular && (
                                            <Badge variant="default" className="w-fit mx-auto -mt-4 bg-orange-500 text-white">Most Popular</Badge>
                                        )}
                                        <CardHeader className="text-center pt-6 pb-4">
                                            <CardTitle className="text-xl md:text-2xl font-bold mb-1">{tier.name}</CardTitle>
                                            <CardDescription>{tier.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col flex-grow items-center p-6 pt-0">
                                            <div className="text-center mb-6">
                                                <p className="text-sm text-muted-foreground">{tier.period}</p>
                                                <p className="text-4xl font-bold text-orange-500">{tier.price}</p>
                                                {tier.periodDescription && <p className="text-xs text-muted-foreground mt-1">{tier.periodDescription}</p>}
                                            </div>
                                            <ul className="space-y-3 text-sm w-full flex-grow text-left">
                                                {(tier.features as {name: string, icon: React.ReactNode}[]).map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-3">
                                                        {feature.icon}
                                                        <span className="text-muted-foreground">{feature.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter className="p-6">
                                            <Button
                                                size="lg"
                                                className={cn("w-full font-bold bg-orange-500 hover:bg-orange-600 text-white")}
                                                onClick={() => handleGetStartedClick(tier)}
                                            >
                                                {tier.buttonText}
                                            </Button>
                                        </CardFooter>
                                    </Card>
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
            <Footer />
        </div>
    );
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
                            {data.title}
                        </motion.h2>
                        <motion.p 
                            variants={cardVariants}
                            className="mt-6 text-muted-foreground md:text-xl/relaxed"
                        >
                            {data.description || 'Choose the perfect plan for your needs. All prices are negotiable.'}
                        </motion.p>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                        className={`grid grid-cols-1 ${gridColsClass} gap-x-8 gap-y-16 items-start max-w-7xl mx-auto`}
                    >
                    {(data.tiers as any[]).map((tier, tierIndex) => (
                        <motion.div 
                            key={tier.name} 
                            variants={cardVariants} 
                            className="flex flex-col h-full relative"
                        >
                             {tier.popular && (
                                <Badge variant="default" className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-orange-500 text-white">Most Popular</Badge>
                            )}
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
                                whileHover={{ y: -8 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Card className={cn(
                                    "flex flex-col w-full bg-card backdrop-blur-sm border-white/20 transition-all duration-300 overflow-hidden",
                                    "hover:shadow-lg hover:border-primary/50",
                                     tier.popular && "border-orange-500 ring-2 ring-orange-500 shadow-orange-500/20"
                                )}>
                                    <CardHeader className="text-center pb-4 pt-6">
                                        <CardTitle className="text-xl md:text-2xl font-headline mb-2 text-primary">{tier.name}</CardTitle>
                                         {tier.description && <CardDescription>{tier.description}</CardDescription>}
                                         <div className="mt-4">
                                            {tier.period && <p className="text-sm text-muted-foreground">{tier.period}</p>}
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-4xl font-bold">{tier.price}</span>
                                            </div>
                                         </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-col flex-grow items-center p-6 pt-0">
                                        <ul className="space-y-4 text-sm w-full flex-grow">
                                            {(tier.features as string[]).map((feature, i) => (
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
                                    <Button 
                                      size="lg" 
                                      className={cn("w-full font-bold", tier.popular ? "bg-orange-500 hover:bg-orange-600" : "bg-primary hover:bg-primary/90")}
                                      onClick={() => handleGetStartedClick(tier)}
                                    >
                                        {tier.buttonText || 'Select Plan'}
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
                        <DialogDescriptionComponent>
                           Select the option that best fits your needs for the {selectedTier.name} plan.
                        </DialogDescriptionComponent>
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

    

    
