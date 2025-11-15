
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

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

const testimonials = [
    {
        initial: 'A',
        name: 'Aarav Sharma',
        rating: 5,
        review: 'The AI chatbot developed for my e-commerce site has been a game-changer. It handles customer queries 24/7, and our sales have increased by 20%!',
    },
    {
        initial: 'S',
        name: 'Sophia Chen',
        rating: 5,
        review: 'Incredible web development work. My new portfolio site is not only beautiful and fast, but it perfectly captures my brand. The process was seamless.',
    },
    {
        initial: 'R',
        name: 'Rohan Mehta',
        rating: 5,
        review: 'The video editing service is absolutely top-notch. They took my raw footage and transformed it into a cinematic masterpiece that exceeded all my expectations.',
    },
    {
        initial: 'I',
        name: 'Isabella Rossi',
        rating: 5,
        review: 'The high-quality photo retouching made my product shots look incredibly professional and ready for a magazine cover. I will definitely be back for more.',
    },
];

const StarRating = ({ rating, className }: { rating: number, className?: string }) => {
    return (
        <div className={cn("flex text-yellow-400", className)}>
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-500'}`} />
            ))}
        </div>
    );
};

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <Card className="bg-background/50 backdrop-blur-sm border p-6 text-center h-full w-[400px] shrink-0">
        <CardHeader className="p-0 items-center mb-4">
            <Avatar className="w-16 h-16 mb-4 border-2 border-primary/50">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">{testimonial.initial}</AvatarFallback>
            </Avatar>
            <h3 className="font-headline text-xl">{testimonial.name}</h3>
            <StarRating rating={testimonial.rating} className="mt-2" />
        </CardHeader>
        <CardContent className="p-0">
            <p className="text-muted-foreground text-sm italic">"{testimonial.review}"</p>
        </CardContent>
    </Card>
);

export function TestimonialsSection() {
    const scrollerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            // Check if user prefers reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (!prefersReducedMotion) {
                scroller.setAttribute("data-animated", "true");
            }
        }
    }, []);

    return (
        <section className="py-24 md:py-32 bg-secondary/20 overflow-hidden">
            <motion.div
                className="container mx-auto px-4"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter">
                        What Our Customers Say
                    </h2>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <StarRating rating={5} />
                        <span className="font-semibold">5.0 rating on Google</span>
                    </div>
                    <p className="mt-4 text-muted-foreground">
                        Happy with our service? Please consider leaving a review on Google. Your feedback helps us grow!
                    </p>
                    <Button
                        asChild
                        variant="glass"
                        className="mt-6 font-bold rounded-full"
                    >
                        <a href="https://maps.app.goo.gl/dhkMzLEB5KPMcCjK9" target="_blank" rel="noopener noreferrer">Rate Us on Google</a>
                    </Button>
                </motion.div>
            </motion.div>
            
            <div className="scroller" ref={scrollerRef}>
                <div className="scroller__inner">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={`testimonial-1-${index}`} testimonial={testimonial} />
                    ))}
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={`testimonial-2-${index}`} testimonial={testimonial} />
                    ))}
                </div>
            </div>

        </section>
    );
}
