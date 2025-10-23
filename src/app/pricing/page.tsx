
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, ArrowRight, CheckCircle, Smartphone, Bot, LayoutTemplate, Briefcase, Database, Cloud, Zap, Shield, Globe, Palette, Cog, UserCog } from 'lucide-react';
import Link from 'next/link';

const pricingData = {
  'video-editing': {
    title: 'Video Editing',
    tiers: [
      {
        name: 'Basic Video Editing',
        price: '₹2,000',
        features: [
          'Simple Cuts & Transitions',
          'Up to 5 Mins (1080p export)',
          'Royalty-Free Music',
          'Max File Size: 5GB',
        ],
        details: ['2 Revisions included', 'Delivery: 2-3 Days'],
        addOns: [
          'Extra minute @ ₹500/min',
          'Express delivery +₹1,000',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
      {
        name: 'Intermediate Video Editing',
        price: '₹5,000',
        popular: true,
        features: [
          'Color Grading & Sound Design',
          'Up to 10 Mins (1080p export)',
          'Basic Motion Graphics',
          'Max File Size: 10GB-20GB',
        ],
        details: ['3 Revisions included', 'Delivery: 4-5 Days'],
        addOns: [
          'Extra minute @ ₹700/min',
          'Express delivery +₹1,500',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
      {
        name: 'Pro Video Editing',
        price: '₹10,000',
        features: [
          'Advanced Effects & VFX',
          'Up to 20 Mins (1080p/4K export)',
          'Custom Animations',
          'Max File Size: 50GB-80GB',
        ],
        details: ['Unlimited Revisions', 'Delivery: 7-10 Days'],
        addOns: [
          'Extra minute @ ₹1,000/min',
          'Express delivery +₹2,000',
          'Extra per GB @ ₹100',
        ],
        buttonText: 'Select Plan',
      },
    ],
  },
  'ai-chatbot': {
    title: 'AI Chatbot',
    tiers: [
      {
        name: 'FAQ/Support Bot',
        price: '₹8,000',
        features: [
          'Handles FAQs',
          'WhatsApp/Telegram Integration',
          'Deployed on chosen platform',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹2,000/month'],
        buttonText: 'Select Plan',
      },
      {
        name: 'Booking Bot',
        price: '₹15,000',
        popular: true,
        features: [
          'Order/Booking via Chat',
          'Google Sheet/Airtable Integration',
          'Owner Notifications',
          'Supports WhatsApp, Website, Messenger',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹3,500/month'],
        buttonText: 'Select Plan',
      },
      {
        name: 'GPT-Powered Bot',
        price: '₹25,000',
        features: [
          'Smart, Human-like Replies',
          'Uses OpenAI Credits (*not included in price*)',
          'Advanced Customization (intents, flows)',
          'Deployed on Website/WhatsApp/Telegram',
          '1 Month Free Support',
        ],
        details: ['Optional: Maintenance +₹5,000/month'],
        buttonText: 'Select Plan',
      },
    ],
  },
  'web-development': {
    title: 'Choose the Right Plan for Your Website',
    description: 'Flexible pricing for Next.js web development, designed to scale with your needs.',
    tiers: [
        {
            name: 'Basic Web Development',
            description: "Perfect for Small Businesses & Personal Sites",
            price: '₹20,000',
            priceSubtitle: 'Starting at',
            features: [
                { icon: <Check className="w-5 h-5 text-primary" />, text: '1-3 Page Website' },
                { icon: <Zap className="w-5 h-5 text-primary" />, text: 'Next.js Framework' },
                { icon: <Database className="w-5 h-5 text-primary" />, text: 'Basic CMS Integration' },
                { icon: <Check className="w-5 h-5 text-primary" />, text: '1 Month Support' },
            ],
            buttonText: 'Start Small',
            size: 'small',
        },
        {
            name: 'Intermediate Web Development',
            description: "Best for Growing Startups",
            price: '₹75,000',
            priceSubtitle: 'Starting at',
            popular: true,
            features: [
                { icon: <Check className="w-5 h-5 text-primary" />, text: 'Up to 6 Page Website' },
                { icon: <Zap className="w-5 h-5 text-primary" />, text: 'Next.js Framework' },
                { icon: <Database className="w-5 h-5 text-primary" />, text: 'Advanced CMS' },
                { icon: <Cog className="w-5 h-5 text-primary" />, text: 'Simple API Integrations' },
                { icon: <Check className="w-5 h-5 text-primary" />, text: '2 Months Support' },
            ],
            buttonText: 'Grow Your Business',
            size: 'medium',
        },
        {
            name: 'Enterprise Web Development',
            description: "Custom Solutions for Enterprises",
            price: '₹1,50,000+',
            priceSubtitle: 'Starting at',
            priceSubDescription: 'Custom Pricing Available',
            features: [
                { icon: <Check className="w-5 h-5 text-primary" />, text: '10+ Page Application' },
                { icon: <Zap className="w-5 h-5 text-primary" />, text: 'Performance Optimization' },
                { icon: <Shield className="w-5 h-5 text-primary" />, text: 'Advanced Security Setup' },
                { icon: <Bot className="w-5 h-5 text-primary" />, text: 'AI Feature Integration' },
                { icon: <Globe className="w-5 h-5 text-primary" />, text: 'Multi-language Support' },
                { icon: <Palette className="w-5 h-5 text-primary" />, text: 'UI/UX Premium Design' },
                { icon: <UserCog className="w-5 h-5 text-primary" />, text: 'Custom Admin Dashboard' },
                { icon: <Cog className="w-5 h-5 text-primary" />, text: 'Custom Integrations' },
                { icon: <Check className="w-5 h-5 text-primary" />, text: '3+ Months Support' },
            ],
            buttonText: 'Build Enterprise Solutions',
            size: 'large',
        },
    ]
  },
};


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

const PricingCard = ({ tier, serviceKey }: { tier: any, serviceKey: string }) => {
    
    if(serviceKey === 'web-development') {
      const sizeClasses = {
        small: 'md:col-span-1',
        medium: 'md:col-span-1',
        large: 'md:col-span-1',
      };
        return (
             <div className={`relative flex flex-col p-6 md:p-8 bg-card rounded-lg shadow-lg ${tier.popular ? 'border-2 border-primary' : 'border border-border'} ${sizeClasses[tier.size as keyof typeof sizeClasses]}`}>
                {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full font-semibold">Most Popular</div>}
                <h3 className="text-xl md:text-2xl font-bold font-headline">{tier.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm flex-grow min-h-[40px]">{tier.description}</p>
                <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">{tier.priceSubtitle}</p>
                    <div className="text-4xl md:text-5xl font-bold font-headline text-primary">{tier.price}</div>
                    {tier.priceSubDescription && <p className="text-xs text-muted-foreground mt-1">{tier.priceSubDescription}</p>}
                </div>
                <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4 text-sm">
                    {tier.features.map((feature: any, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                        <span className="text-primary">{feature.icon}</span>
                        <span>{feature.text}</span>
                    </li>
                    ))}
                </ul>
                <div className="flex-grow"></div>
                <Button asChild className="w-full mt-6 md:mt-8 font-bold text-base md:text-lg py-3 md:py-6">
                    <Link href={`/#contact?service=${encodeURIComponent(tier.name)}`}>{tier.buttonText}</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className={`relative flex flex-col p-6 md:p-8 bg-card rounded-lg shadow-lg ${tier.popular ? 'border-2 border-primary' : 'border border-border'}`}>
            {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full font-semibold">Most Popular</div>}
            <h3 className="text-xl md:text-2xl font-bold font-headline text-center">{tier.name}</h3>
            <div className="my-4 md:my-6 text-center">
                <span className="text-4xl md:text-5xl font-bold font-headline text-primary">{tier.price}</span>
            </div>
            <ul className="space-y-3 md:space-y-4 text-sm flex-grow">
                {tier.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
                ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-border text-sm space-y-3 text-muted-foreground">
                {tier.details?.map((detail: string, index: number) => (
                    <p key={index}>{detail}</p>
                ))}
            </div>

            {tier.addOns && (
              <div className="mt-4 pt-4 border-t border-border text-sm">
                  <p className="font-semibold mb-2">Add-Ons:</p>
                  <ul className="space-y-1 text-muted-foreground">
                  {tier.addOns?.map((addOn: string, index: number) => (
                      <li key={index}>{addOn}</li>
                  ))}
                  </ul>
              </div>
            )}
            
            <div className="mt-auto pt-8">
                 <Button asChild className="w-full font-bold text-base md:text-lg py-3 md:py-6">
                    <Link href={`/#contact?service=${encodeURIComponent(tier.name)}`}>{tier.buttonText}</Link>
                 </Button>
            </div>
        </div>
    );
};


export default function PricingPage() {
  const webDevService = pricingData['web-development'];

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
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter">
                Our Digital Service <span className="text-primary">Pricing</span>
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-xl/relaxed text-muted-foreground">
                Transparent pricing for high-quality digital services. Choose the plan that fits your needs.
              </p>
            </motion.div>
            
            {Object.keys(pricingData).map(serviceKey => {
              if (serviceKey === 'web-development') return null;
              const service = pricingData[serviceKey as keyof typeof pricingData];
              return (
                <motion.div key={service.title} variants={itemVariants} className="mb-16 md:mb-24">
                  <header className="flex justify-between items-center mb-8 md:mb-12">
                     <h2 className="text-2xl md:text-4xl font-bold font-headline">{service.title}</h2>
                     <Link href={`/services/${serviceKey}`} className="flex items-center text-primary hover:underline text-sm md:text-base">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </header>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {service.tiers.map((tier) => (
                      <motion.div
                        key={tier.name}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <PricingCard tier={tier} serviceKey={serviceKey} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}

            {/* Web Development Section */}
            <motion.div variants={itemVariants} className="mb-16 md:mb-24">
                <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{webDevService.title}</h2>
                    <p className="mt-4 text-muted-foreground text-base md:text-lg">{webDevService.description}</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                    {webDevService.tiers.map((tier) => (
                      <motion.div
                        key={tier.name}
                        whileHover={{ y: -8, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <PricingCard tier={tier} serviceKey="web-development" />
                      </motion.div>
                    ))}
                </div>
            </motion.div>

          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}

    