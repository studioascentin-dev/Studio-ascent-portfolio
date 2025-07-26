
"use client";

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Mail, Phone } from 'lucide-react';

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

export function HireMeSection() {
    const phoneNumber = "919707191619";
    const emailAddress = "devkumardas@example.com";

    const handleWhatsAppClick = () => {
        const message = "Hello! I'm interested in your services and would like to discuss a project.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    const handleEmailClick = () => {
        const subject = "Project Inquiry from your Portfolio";
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
        window.location.href = mailtoUrl;
    }

    return (
        <section id="hire-me" className="py-24 md:py-32 bg-secondary/30">
            <motion.div
                className="container mx-auto px-4 md:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
                    >
                        Let's Create Something Amazing
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        I'm currently available for freelance projects. If you have an idea you'd like to discuss, feel free to reach out.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            size="lg"
                            className="w-full sm:w-auto font-bold text-lg py-4 px-10 bg-green-500 hover:bg-green-600 text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                            onClick={handleWhatsAppClick}
                        >
                            <Phone className="mr-2 h-5 w-5" />
                            Contact on WhatsApp
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto font-bold text-lg py-4 px-10 shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                            onClick={handleEmailClick}
                        >
                            <Mail className="mr-2 h-5 w-5" />
                            Send an Email
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
