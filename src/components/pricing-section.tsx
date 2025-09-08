
"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Check, ArrowRight } from "lucide-react";
import Link from 'next/link';

const pricingTiers = [
    {
        service: "Photo Editing",
        slug: "photo-editing",
        tiers: [
            { name: "Basic", price: "₹399", period: "/5 photos", features: ["Basic Retouching", "Color Correction", "1 Revision"] },
            { name: "Intermediate", price: "₹999", period: "/10 photos", features: ["Advanced Retouching", "Color Grading", "Background Removal"] },
            { name: "Pro", price: "₹1,999", period: "/5 photos", features: ["High-End Retouching", "Complex Manipulations", "Source Files"] },
        ]
    },
    {
        service: "Video Editing",
        slug: "video-editing",
        tiers: [
            { name: "Basic", price: "₹3,000", period: "/min", features: ["Basic Cuts & Transitions", "Royalty-Free Music", "1 Revision"] },
            { name: "Intermediate", price: "₹7,500", period: "/min", features: ["Advanced Transitions", "Color Grading", "2 Revisions"] },
            { name: "Pro", price: "₹15,000", period: "/min", features: ["Custom Animations", "Advanced Color", "3 Revisions"] },
        ]
    },
    {
        service: "PPT Design",
        slug: "ppt-design",
        tiers: [
            { name: "Basic", price: "₹2,500", period: "/deck", features: ["Up to 10 Slides", "Template-based", "2 Revisions"] },
            { name: "Intermediate", price: "₹6,000", period: "/deck", features: ["Up to 20 Slides", "Custom Template", "Infographics"] },
            { name: "Pro", price: "₹12,000", period: "/deck", features: ["Up to 35 Slides", "Full Custom Design", "Advanced Animations"] },
        ]
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

export function PricingSection() {
    return (
        <section id="pricing" className="py-24 md:py-32 bg-secondary/50">
            <motion.div 
                className="container mx-auto px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <motion.div 
                    variants={itemVariants} 
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                        Flexible <span className="text-primary">Pricing</span>
                    </h2>
                    <p className="mt-6 text-muted-foreground md:text-xl/relaxed">
                        Choose a plan that works for you. Custom packages are available upon request.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {pricingTiers.map((service) => (
                        <motion.div key={service.slug} variants={itemVariants}>
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold font-headline">{service.service}</h3>
                                <Link href={`/pricing/${service.slug}`} className="text-primary font-semibold hover:underline inline-flex items-center">
                                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {service.tiers.map(tier => (
                                     <Card key={tier.name} className="flex flex-col bg-card/80 hover:-translate-y-2 transition-transform duration-300">
                                        <CardHeader className="text-center">
                                            <CardTitle className="text-2xl font-headline text-primary">{tier.name}</CardTitle>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-4xl font-bold">{tier.price}</span>
                                                <span className="text-sm text-muted-foreground">{tier.period}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <ul className="space-y-3 text-sm">
                                                {tier.features.map(feature => (
                                                    <li key={feature} className="flex items-center gap-3">
                                                        <Check className="h-5 w-5 text-green-500" />
                                                        <span className="text-muted-foreground">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full font-bold" asChild>
                                                <Link href={`/pricing/${service.slug}`}>Select Plan</Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </section>
    );
}
