
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star } from 'lucide-react';

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
        initial: 'P',
        name: 'Priya Mehta',
        rating: 5,
        review: 'The photo editing service is top-notch. They transformed my old family photos beautifully. Thank you!',
    },
    {
        initial: 'A',
        name: 'Anil Kumar',
        rating: 5,
        review: 'I was struggling with the NSP scholarship form. The team here guided me through every step. Excellent support.',
    },
    {
        initial: 'S',
        name: 'Sunita Devi',
        rating: 5,
        review: 'Aadhaar correction was completely hassle-free. The owner is very knowledgeable and helpful. I highly recommend this place.',
    },
    {
        initial: 'V',
        name: 'Vikram Singh',
        rating: 4,
        review: 'Needed an urgent print and lamination for my documents. Service was great and the price was reasonable.',
    },
];

const StarRating = ({ rating, className }: { rating: number, className?: string }) => {
    return (
        <div className={`flex text-yellow-400 ${className}`}>
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-500'}`} />
            ))}
        </div>
    );
};

export function TestimonialsSection() {
    return (
        <section className="py-24 md:py-32 bg-secondary/20">
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
                        className="mt-6 font-bold bg-orange-500 text-white hover:bg-orange-600"
                    >
                        <a href="#" target="_blank" rel="noopener noreferrer">Rate Us on Google</a>
                    </Button>
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="bg-background/50 backdrop-blur-sm border p-6 text-center h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-primary/20">
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
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
