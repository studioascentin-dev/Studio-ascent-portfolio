
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, ArrowRight, CheckCircle, Smartphone, Bot, LayoutTemplate, Briefcase, Database, Cloud } from 'lucide-react';
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
        name: 'Starter Bot',
        price: '₹8,000',
        features: [
          'Basic FAQ & Answer Bot',
          'Website Integration',
          'Basic Lead Capture Form',
          'Dashboard & Analytics',
        ],
        details: ['Up to 1,000 Interactions/month', 'Standard Support'],
        buttonText: 'Get Started',
      },
      {
        name: 'Business Bot',
        price: '₹15,000',
        popular: true,
        features: [
          'Advanced Conversational Flow',
          'WhatsApp & Messenger Integration',
          'Appointment Booking',
          'CRM Integration',
        ],
        details: ['Up to 5,000 Interactions/month', 'Priority Support'],
        buttonText: 'Get Started',
      },
      {
        name: 'Enterprise Bot',
        price: 'Contact Us',
        features: [
          'Custom AI Model Integration',
          'Omnichannel Support',
          'Payment Gateway Integration',
          'Dedicated Account Manager',
        ],
        details: ['Unlimited Interactions', '24/7 Premium Support'],
        buttonText: 'Contact Us',
      },
    ],
  },
  'web-development': {
    title: 'Web Development',
    tiers: [
        {
            name: 'Basic',
            description: "Perfect for personal sites or small projects.",
            price: '₹12,000',
            features: [
                { icon: <LayoutTemplate className="w-5 h-5" />, text: 'Up to 5 Pages' },
                { icon: <Smartphone className="w-5 h-5" />, text: 'Responsive Design' },
                { icon: <Briefcase className="w-5 h-5" />, text: 'Contact Form' },
            ],
            buttonText: 'Start Small'
        },
        {
            name: 'Intermediate',
            description: "Ideal for small businesses and startups.",
            price: '₹25,000',
            popular: true,
            features: [
                { icon: <LayoutTemplate className="w-5 h-5" />, text: 'Up to 10 Pages' },
                { icon: <Briefcase className="w-5 h-5" />, text: 'CMS Integration' },
                { icon: <Database className="w-5 h-5" />, text: 'Basic SEO Setup' },
                { icon: <Cloud className="w-5 h-5" />, text: 'Social Media Integration' },
            ],
            buttonText: 'Grow Your Business'
        },
        {
            name: 'Enterprise',
            description: "For established businesses with custom needs.",
            price: '₹50,000+',
            features: [
                { icon: <LayoutTemplate className="w-5 h-5" />, text: 'Unlimited Pages' },
                { icon: <Briefcase className="w-5 h-5" />, text: 'Custom Features' },
                { icon: <Database className="w-5 h-5" />, text: 'E-commerce Functionality' },
                { icon: <Cloud className="w-5 h-5" />, text: 'Advanced SEO & Analytics' },
            ],
            buttonText: 'Build Enterprise Solutions'
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
        return (
             <div className={`relative flex flex-col p-6 bg-card rounded-lg shadow-lg ${tier.popular ? 'border-2 border-orange-500' : 'border border-border'}`}>
                {tier.popular && <div className="absolute top-0 -translate-y-1/2 px-3 py-1 text-sm text-white bg-orange-500 rounded-full font-semibold">Most Popular</div>}
                <h3 className="text-xl font-bold font-headline">{tier.name}</h3>
                <p className="mt-2 text-muted-foreground text-sm flex-grow">{tier.description}</p>
                <div className="mt-4 text-4xl font-bold font-headline">{tier.price}</div>
                <ul className="mt-6 space-y-4 text-sm">
                    {tier.features.map((feature: any, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                        <span className="text-green-500">{feature.icon}</span>
                        <span>{feature.text}</span>
                    </li>
                    ))}
                </ul>
                <div className="flex-grow"></div>
                <Button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold">{tier.buttonText}</Button>
            </div>
        )
    }

    return (
        <div className={`relative flex flex-col p-6 bg-card rounded-lg shadow-lg ${tier.popular ? 'border-2 border-orange-500' : 'border border-border'}`}>
            {tier.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-3 py-1 text-sm text-white bg-orange-500 rounded-full font-semibold">Most Popular</div>}
            <h3 className="text-xl font-bold font-headline text-center">{tier.name}</h3>
            <div className="my-4 text-center">
                <span className="text-4xl font-bold font-headline text-orange-500">{tier.price}</span>
            </div>
            <ul className="space-y-3 text-sm flex-grow">
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

            <div className="mt-4 pt-4 border-t border-border text-sm">
                <p className="font-semibold mb-2">Add-Ons:</p>
                <ul className="space-y-1 text-muted-foreground">
                {tier.addOns?.map((addOn: string, index: number) => (
                    <li key={index}>{addOn}</li>
                ))}
                </ul>
            </div>
            
            <div className="mt-auto pt-6">
                 <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">{tier.buttonText}</Button>
            </div>
        </div>
    );
};


export default function PricingPage() {
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
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                Our Digital Service <span className="text-primary">Pricing</span>
              </h1>
              <p className="mt-6 text-muted-foreground md:text-xl/relaxed">
                Transparent pricing for high-quality digital services. Choose the plan that fits your needs.
              </p>
            </motion.div>
            
            {Object.keys(pricingData).map(serviceKey => {
              const service = pricingData[serviceKey as keyof typeof pricingData];
              return (
                <motion.div key={service.title} variants={itemVariants} className="mb-24">
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-3xl font-bold font-headline">{service.title}</h2>
                     <Link href={`/services/${serviceKey}`} className="flex items-center text-primary hover:underline">
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {service.tiers.map((tier) => (
                      <PricingCard key={tier.name} tier={tier} serviceKey={serviceKey} />
                    ))}
                  </div>
                </motion.div>
              )
            })}

          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
