
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { pricingData } from '@/lib/pricing-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

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

const cardColors: { [key: string]: string } = {
  pink: "shadow-pink-500/20 hover:border-pink-500/80",
  purple: "shadow-primary/20 hover:border-primary/80",
  green: "shadow-green-500/20 hover:border-green-500/80",
  yellow: "shadow-yellow-500/20 hover:border-yellow-500/80",
  blue: "shadow-blue-500/20 hover:border-blue-500/80",
  orange: "shadow-orange-500/20 hover:border-orange-500/80",
};

const ThemedPricingCard = ({ tier, serviceKey }: { tier: any, serviceKey: string }) => {
  return (
    <div className={cn(
      "relative flex flex-col h-full rounded-2xl bg-black/50 border border-white/10 p-6 transition-all duration-300 shadow-lg hover:shadow-2xl",
      cardColors[tier.color as keyof typeof cardColors]
    )}>
      {tier.popular && (
        <Badge variant="default" className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white">
          Most Popular
        </Badge>
      )}
      <div className="flex-grow">
        <h3 className="text-xl font-bold font-headline text-white mb-2">{tier.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow min-h-[40px]">{tier.description}</p>
        <p className="text-3xl font-semibold text-white mb-6">{tier.price}</p>
        
        <ul className="space-y-3 text-sm text-[#E0E0E0]">
          {tier.features.map((feature: any, index: number) => (
            <li key={index} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-primary" />
              <span>{typeof feature === 'string' ? feature : feature.text}</span>
            </li>
          ))}
        </ul>
        
        {tier.delivery && (
            <div className="flex items-center gap-3 mt-4 text-sm text-[#E0E0E0]">
                <Clock className="h-4 w-4 text-primary" />
                <span>Delivery: {tier.delivery}</span>
            </div>
        )}

        {tier.addOns && (
            <div className="mt-6 text-sm text-[#E0E0E0]/80">
                <p className="font-semibold text-white/90 mb-2">Add-Ons:</p>
                <ul className="list-disc list-inside space-y-1">
                    {tier.addOns.map((addOn: string, i: number) => <li key={i}>{addOn}</li>)}
                </ul>
            </div>
        )}

        {tier.details && (
              <div className="mt-6 pt-4 border-t border-white/10 text-sm space-y-3 text-muted-foreground">
                  {tier.details?.map((detail: string, index: number) => (
                      <p key={index}>{detail}</p>
                  ))}
              </div>
        )}
      </div>

      <div className="mt-8">
        <Button asChild className="w-full font-bold bg-primary text-white hover:bg-primary/80">
           <Link href={`/?contact=true&service=${encodeURIComponent(tier.name)}#contact`}>{tier.buttonText || 'Select Plan'}</Link>
        </Button>
      </div>
    </div>
  );
};

const ServiceSection = ({ service }: { service: any }) => {
    if (!service || !service.tiers) return null;

    return (
        <motion.div variants={itemVariants} className="mb-16 md:mb-24">
            <div className="bg-[#0F0F0F] p-8 md:p-16 rounded-3xl -mx-4 md:-mx-8">
              <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">{service.title}</h2>
                  <p className="mt-4 text-muted-foreground text-base md:text-lg">{service.description}</p>
              </header>
              <div className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-stretch",
                   service.tiers.length === 4 ? 'lg:grid-cols-4' : '',
                   service.tiers.length === 3 ? 'lg:grid-cols-3' : ''
              )}>
                  {service.tiers.map((tier: any) => (
                    <motion.div
                      key={tier.name}
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <ThemedPricingCard tier={tier} serviceKey={service.key} />
                    </motion.div>
                  ))}
              </div>
            </div>
        </motion.div>
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
            
            <ServiceSection service={pricingData['reel-editing']} />
            <ServiceSection service={pricingData['ai-chatbot']} />

            {webDevService && (
                <motion.div variants={itemVariants} className="mb-16 md:mb-24">
                    <div className="bg-[#0F0F0F] p-8 md:p-16 rounded-3xl -mx-4 md:-mx-8">
                        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">{webDevService.title}</h2>
                            <p className="mt-4 text-muted-foreground text-base md:text-lg">{webDevService.description}</p>
                        </header>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                            {webDevService.tiers.map((tier) => (
                                <motion.div
                                    key={tier.name}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="flex"
                                >
                                    <div className={cn(
                                        "relative flex flex-col h-full w-full rounded-2xl bg-black/50 border p-8 transition-all duration-300",
                                        tier.popular ? "border-primary shadow-2xl shadow-primary/20" : "border-white/10"
                                    )}>
                                        {tier.popular && (
                                            <Badge variant="default" className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-white">
                                                Most Popular
                                            </Badge>
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold font-headline text-white mb-2">{tier.name}</h3>
                                            <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">{tier.description}</p>
                                            <p className="text-2xl font-bold text-white mb-6">{tier.price}</p>
                                            <ul className="space-y-3 text-sm text-[#E0E0E0]">
                                                {tier.features.map((feature: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-auto pt-6">
                                             {tier.details && tier.details.length > 0 && (
                                                <p className="text-xs text-muted-foreground mb-6">{tier.details[0]}</p>
                                             )}
                                            <Button asChild className="w-full font-bold bg-primary text-white hover:bg-primary/80">
                                                <Link href={`/?contact=true&service=${encodeURIComponent(tier.name)}#contact`}>{tier.buttonText}</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
