
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Handshake, IndianRupee, Rocket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const reasons = [
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Creative & Modern Solutions",
    description: "I bring a fresh perspective to every project, combining creative design with the latest web technologies to build impactful and memorable digital experiences."
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Passionate & Client-Focused",
    description: "Your vision is my priority. I am passionate about understanding your goals and translating them into a final product that exceeds your expectations."
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "Negotiable Pricing",
    description: "I believe in fair and flexible pricing. All project costs are negotiable based on the specific scope and complexity of the work to ensure a perfect fit for your budget."
  },
  {
    icon: <IndianRupee className="h-8 w-8 text-primary" />,
    title: "Payment Terms",
    description: "To ensure commitment and secure project scheduling, a 50% advance payment is required for all projects with a total cost exceeding ₹10,000."
  }
];

const services = [
    "Video Editing",
    "Photo Editing",
    "PPT Design",
    "Web Design",
    "Web Development"
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export function HireMeSection() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const phoneNumber = "911234567890"; // TODO: Replace with your WhatsApp number (e.g., 91 for India)
  
  const handleContinue = () => {
    const message = `Hello! I'm interested in your services, specifically for ${selectedService}. I'd like to discuss a project.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsDialogOpen(false);
  }

  return (
    <section id="hire-me" className="py-24 md:py-32 bg-secondary/30">
      <motion.div 
        className="container mx-auto px-4 md:px-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl"
          >
            Why Hire Me?
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-muted-foreground md:text-xl/relaxed"
          >
            Let's collaborate to build something amazing. Here’s what I bring to the table.
          </motion.p>
        </div>

        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {reasons.map((reason) => (
            <motion.div 
              key={reason.title} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {reason.icon}
                    <CardTitle className="text-xl md:text-2xl font-headline">{reason.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-16">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="font-bold text-base md:text-lg py-4 px-10 md:py-6 md:px-12 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95">
                  Let's Talk
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>What can I help you with?</DialogTitle>
                  <DialogDescription>
                    Select a service you're interested in so I can better understand your needs.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <RadioGroup defaultValue={selectedService} onValueChange={setSelectedService}>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                            <RadioGroupItem value={service} id={service.replace(/\s+/g, '-').toLowerCase()} />
                            <Label htmlFor={service.replace(/\s+/g, '-').toLowerCase()} className="cursor-pointer">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <Button onClick={handleContinue} className="w-full">Continue to WhatsApp</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </motion.div>
      </motion.div>
    </section>
  );
}
