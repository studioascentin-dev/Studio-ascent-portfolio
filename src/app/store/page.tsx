
"use client";

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { ContactForm } from '@/components/contact-form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, LifeBuoy } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const storeItems = {
  plugins: [
    { name: 'Saber', image: 'https://picsum.photos/seed/saber/600/400', dataAiHint: 'light effect' },
    { name: 'Orb', image: 'https://picsum.photos/seed/orb/600/400', dataAiHint: 'planet render' },
    { name: 'Element 3D', image: 'https://picsum.photos/seed/element3d/600/400', dataAiHint: '3d model' },
    { name: 'Twitch', image: 'https://picsum.photos/seed/twitch/600/400', dataAiHint: 'glitch effect' },
  ],
  templates: [
    { name: 'Logo Intro', image: 'https://picsum.photos/seed/logointro/600/400', dataAiHint: 'logo animation' },
    { name: 'Slideshow', image: 'https://picsum.photos/seed/slideshow/600/400', dataAiHint: 'photo gallery' },
    { name: 'Typography Pack', image: 'https://picsum.photos/seed/typography/600/400', dataAiHint: 'animated text' },
    { name: 'Lower Thirds', image: 'https://picsum.photos/seed/lowerthird/600/400', dataAiHint: 'video overlay' },
  ],
  applications: [
    { name: 'After Effects', image: 'https://picsum.photos/seed/aftereffects/600/400', dataAiHint: 'motion graphics' },
    { name: 'Premiere Pro', image: 'https://picsum.photos/seed/premiere/600/400', dataAiHint: 'video editing software' },
    { name: 'Final Cut Pro', image: 'https://picsum.photos/seed/finalcut/600/400', dataAiHint: 'apple software' },
    { name: 'DaVinci Resolve', image: 'https://picsum.photos/seed/davinci/600/400', dataAiHint: 'color grading' },
  ],
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

const StoreContactForm = ({ itemName }: { itemName: string }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const phoneNumber = "919707191619";

    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        email: z.string().email({ message: "Please enter a valid email." }),
        issue: z.string().min(10, { message: "Please describe the issue in at least 10 characters." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            issue: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        const messageBody = `Hello! I'm having an issue with the store item: *${itemName}*.\n\n*Name:*\n${values.name}\n\n*Email:*\n${values.email}\n\n*Issue Description:*\n${values.issue}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageBody)}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        toast({
            title: "Redirecting to WhatsApp...",
            description: "Your support message is ready to be sent.",
        });

        form.reset();
        setIsSubmitting(false);
    }

    return (
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="issue"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Problem Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Please describe the problem you're experiencing."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send via WhatsApp
                </Button>
            </form>
        </Form>
    )
}


const StoreItemCard = ({ item }: { item: { name: string; image: string; dataAiHint: string } }) => {
  return (
    <motion.div variants={itemVariants}>
      <Card className="flex flex-col h-full bg-secondary/50 backdrop-blur-sm border-white/10 shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-primary/20 hover:border-primary group">
        <CardHeader className="p-0 aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={item.dataAiHint}
          />
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold font-headline mb-4 flex-grow">{item.name}</h3>
          <div className="flex gap-2 mt-auto">
            <Button className="w-full font-semibold flex-1">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                        <LifeBuoy className="h-4 w-4"/>
                        <span className="sr-only">Report a problem</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Report an Issue with {item.name}</DialogTitle>
                        <DialogDescription>
                            If you're having trouble, please describe the issue below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <StoreContactForm itemName={item.name} />
                    </div>
                </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function StorePage() {
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
                Digital Product Store
              </h1>
              <p className="mt-6 text-muted-foreground md:text-xl/relaxed">
                High-quality plugins, templates, and applications to level up your creative projects.
              </p>
            </motion.div>

            {Object.entries(storeItems).map(([category, items]) => (
              <motion.div key={category} variants={sectionVariants} className="mb-20">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-headline mb-8 capitalize">
                  {category.replace(/([A-Z])/g, ' $1')}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.map((item) => (
                    <StoreItemCard key={item.name} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
