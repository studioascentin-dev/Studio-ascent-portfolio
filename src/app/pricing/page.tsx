
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { pricingData } from '@/lib/pricing-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

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

interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  delivery?: string;
  addOns?: string[];
  popular?: boolean;
  color?: string;
  buttonText: string;
}

const ThemedPricingCard = ({ tier, onSelectPlan }: { tier: Tier, onSelectPlan: (tier: Tier) => void }) => {
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
      </div>

      <div className="mt-8">
        <Button onClick={() => onSelectPlan(tier)} className="w-full font-bold bg-primary text-white hover:bg-primary/80">
           {tier.buttonText || 'Select Plan'}
        </Button>
      </div>
    </div>
  );
};

const ServiceSection = ({ service, onSelectPlan }: { service: any, onSelectPlan: (tier: Tier) => void }) => {
    if (!service || !service.tiers) return null;

    const gridColsClass = () => {
      switch (service.tiers.length) {
        case 4:
          return 'lg:grid-cols-4';
        case 3:
          return 'lg:grid-cols-3';
        default:
          return 'lg:grid-cols-3';
      }
    };

    return (
        <motion.div variants={itemVariants} className="mb-16 md:mb-24">
            <div className="bg-[#0F0F0F] p-8 md:p-16 rounded-3xl -mx-4 md:-mx-8">
              <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">{service.title}</h2>
                  <p className="mt-4 text-muted-foreground text-base md:text-lg">{service.description}</p>
              </header>
              <div className={cn(
                  "grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-stretch",
                   gridColsClass()
              )}>
                  {service.tiers.map((tier: Tier) => (
                    <motion.div
                      key={tier.name}
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="h-full"
                    >
                      <ThemedPricingCard tier={tier} onSelectPlan={onSelectPlan} />
                    </motion.div>
                  ))}
              </div>
            </div>
        </motion.div>
    );
};


const purposeOptions = [
    "E-commerce / Online Store",
    "Portfolio / Personal Website",
    "Business / Corporate Site",
    "Blog / Content Platform",
    "Food / Restaurant Business",
    "Other"
];

export default function PricingPage() {
  const router = useRouter();
  const [dialogStep, setDialogStep] = useState<'addons' | 'purpose' | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Tier | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [customPurpose, setCustomPurpose] = useState('');

  const handleSelectPlan = (tier: Tier) => {
    const serviceKey = Object.keys(pricingData).find(key => 
        pricingData[key as keyof typeof pricingData].tiers.some(t => t.name === tier.name)
    );

    if (serviceKey === 'reel-editing') {
      const message = `Hi, I'm interested in the "${tier.name}" plan. Please let me know the next steps.`;
      const query = new URLSearchParams({
        service: tier.name,
        message: message,
      }).toString();
      router.push(`/?contact=true&${query}#contact`);
    } else {
      setSelectedPlan(tier);
      setSelectedAddons([]); 
      setSelectedPurpose('');
      setCustomPurpose('');
      setDialogStep('addons');
    }
  };
  
  const closeDialog = () => {
    setDialogStep(null);
    // Delay setting plan to null to avoid content flashing during exit animation
    setTimeout(() => setSelectedPlan(null), 300);
  }

  const handleAddonToggle = (addon: string) => {
    setSelectedAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const handleContinue = () => {
    if (!selectedPlan) return;

    let purposeMessage = selectedPurpose;
    if (selectedPurpose === 'Other') {
        purposeMessage = customPurpose || 'Other';
    }
    
    let message = `Hi, I'm interested in the "${selectedPlan.name}" plan for my project.`;

    if (purposeMessage) {
        message += ` It's for a(n) ${purposeMessage}.`;
    }

    if (selectedAddons.length > 0) {
      message += `\n\nI'd also like to include the following add-ons:\n- ${selectedAddons.join('\n- ')}`;
    }
    
    message += `\n\nPlease let me know the next steps.`
    
    const query = new URLSearchParams({
      service: selectedPlan.name,
      message: message,
    }).toString();

    router.push(`/?contact=true&${query}#contact`);
    closeDialog();
  };

  const hasAddons = selectedPlan?.addOns && selectedPlan.addOns.length > 0;

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
            
            <ServiceSection service={pricingData['reel-editing']} onSelectPlan={handleSelectPlan} />
            <ServiceSection service={pricingData['ai-chatbot']} onSelectPlan={handleSelectPlan} />
            <ServiceSection service={pricingData['web-development']} onSelectPlan={handleSelectPlan} />

          </div>
        </motion.section>

        <Dialog open={!!selectedPlan && dialogStep !== null} onOpenChange={closeDialog}>
          <DialogContent className="max-w-md">
             <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{selectedPlan?.name}</DialogTitle>
            </DialogHeader>

            {dialogStep === 'addons' && (
                <>
                {hasAddons ? (
                  <div className="space-y-4 py-4">
                    <h4 className="font-semibold text-lg">Select Add-ons</h4>
                    <div className="space-y-3">
                      {selectedPlan!.addOns!.map((addon) => (
                        <div key={addon} className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-md">
                          <Checkbox 
                            id={addon} 
                            checked={selectedAddons.includes(addon)}
                            onCheckedChange={() => handleAddonToggle(addon)}
                          />
                          <Label htmlFor={addon} className="flex-1 cursor-pointer text-sm">{addon}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="py-4 text-muted-foreground">This plan has no available add-ons.</p>
                )}
                 <DialogFooter>
                    <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={() => setDialogStep('purpose')}>Continue</Button>
                </DialogFooter>
              </>
            )}

            {dialogStep === 'purpose' && (
                <>
                 <div className="space-y-4 py-4">
                    <h4 className="font-semibold text-lg">What is this project for?</h4>
                     <RadioGroup value={selectedPurpose} onValueChange={setSelectedPurpose}>
                      <div className="space-y-3">
                        {purposeOptions.map((purpose) => (
                          <div key={purpose} className="flex items-center space-x-3 bg-secondary/50 p-3 rounded-md">
                            <RadioGroupItem value={purpose} id={purpose} />
                            <Label htmlFor={purpose} className="flex-1 cursor-pointer text-sm">{purpose}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    {selectedPurpose === 'Other' && (
                        <Textarea 
                            placeholder="Please describe your project..."
                            value={customPurpose}
                            onChange={(e) => setCustomPurpose(e.target.value)}
                            className="mt-4"
                        />
                    )}
                  </div>
                  <DialogFooter className="flex justify-between w-full">
                    <Button variant="ghost" onClick={() => setDialogStep('addons')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={closeDialog}>Cancel</Button>
                        <Button onClick={handleContinue} disabled={!selectedPurpose || (selectedPurpose === 'Other' && !customPurpose)}>Continue</Button>
                    </div>
                </DialogFooter>
                </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
