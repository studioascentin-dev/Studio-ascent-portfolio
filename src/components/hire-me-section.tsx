
"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

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

    const handleWhatsAppClick = () => {
        const message = "Hello! I saw your portfolio and I'm interested in your services. Let's discuss a project.";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    
    return (
        <section id="contact" className="py-24 md:py-32 bg-secondary/50">
            <motion.div
                className="container mx-auto px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="text-center max-w-3xl mx-auto">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl"
                    >
                        Contact <span className="text-primary">Me</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-muted-foreground md:text-xl/relaxed"
                    >
                        I'm currently available for freelance projects. If you have an idea you'd like to discuss, feel free to reach out.
                    </motion.p>
                </div>
                
                <motion.div 
                    variants={itemVariants}
                    className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
                >
                    <Card className="bg-card/80">
                        <CardContent className="p-6">
                            <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold font-headline">Location</h3>
                            <p className="text-muted-foreground">Sonapur, India</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/80">
                        <CardContent className="p-6">
                            <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold font-headline">Email</h3>
                            <a href="mailto:devkumardas2003@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                devkumardas2003@gmail.com
                            </a>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/80">
                        <CardContent className="p-6">
                            <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="text-xl font-bold font-headline">WhatsApp</h3>
                             <a href="#" onClick={handleWhatsAppClick} className="text-muted-foreground hover:text-primary transition-colors">
                                +91 9707191619
                            </a>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-center"
                >
                    <Button
                        size="lg"
                        className="font-bold text-lg py-4 px-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
                        onClick={handleWhatsAppClick}
                    >
                        Get in Touch
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
