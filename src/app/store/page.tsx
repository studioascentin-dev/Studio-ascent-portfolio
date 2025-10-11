
"use client";

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LifeBuoy, Apple, Star, Check } from 'lucide-react';
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
    { 
      name: 'Shadow Studio 2', 
      image: 'https://picsum.photos/seed/shadow-studio-2/600/400', 
      dataAiHint: '3d text effect',
      reviews: 82,
      rating: 5,
      description: 'Advanced shadow plugin for realistic and customizable shadows in After Effects.',
      price: 99,
      originalPrice: 1999,
      discount: '95% OFF',
      platform: 'Mac Only'
    },
    { 
      name: 'Sapphire AE Install', 
      image: 'https://picsum.photos/seed/sapphire/600/400', 
      dataAiHint: 'vfx plugins',
      reviews: 105,
      rating: 5,
      description: 'A complete suite of powerful visual effects plugins for After Effects.',
      price: 99,
      originalPrice: 3499,
      discount: '97% OFF',
      platform: 'Mac Only'
    },
     { 
      name: 'JerryFlow', 
      image: 'https://picsum.photos/seed/jerryflow/600/400', 
      dataAiHint: 'animation curves',
      reviews: 34,
      rating: 5,
      description: 'A workflow enhancement tool for After Effects to streamline your animation process.',
      price: 99,
      originalPrice: 999,
      discount: '90% OFF',
      platform: 'Mac Only'
    },
    { 
      name: 'Twixtor Pro', 
      image: 'https://picsum.photos/seed/twixtor/600/400', 
      dataAiHint: 'slow motion effect',
      reviews: 78,
      rating: 4,
      description: 'Intelligently slow down or speed up your image sequences with visually stunning results.',
      price: 99,
      originalPrice: 1799,
      discount: '94% OFF',
      platform: 'Mac Only'
    },
    { 
      name: 'Gaussian Splatting', 
      image: 'https://picsum.photos/seed/splatting/600/400', 
      dataAiHint: '3d rendering plugin',
      reviews: 12,
      rating: 5,
      description: 'Real-time radiance field rendering plugin for creating photorealistic scenes.',
      price: 99,
      originalPrice: 3999,
      discount: '98% OFF',
      platform: 'Mac Only'
    },
    { 
      name: 'Shadow Studio 3', 
      image: 'https://picsum.photos/seed/shadow-studio-3/600/400', 
      dataAiHint: '3d text effect',
      reviews: 41,
      rating: 5,
      description: 'The latest version with improved performance and more shadow types.',
      price: 99,
      originalPrice: 3499,
      discount: '97% OFF',
      platform: 'Mac & Windows'
    },
    { 
      name: 'Deep Glow 2', 
      image: 'https://picsum.photos/seed/deepglow2/600/400', 
      dataAiHint: 'neon glow effect',
      reviews: 66,
      rating: 4,
      description: 'Physically accurate and high-quality glow effects for After Effects.',
      price: 99,
      originalPrice: 1299,
      discount: '92% OFF',
      platform: 'Mac Only'
    },
    { 
      name: 'Element 3D', 
      image: 'https://picsum.photos/seed/element3d/600/400', 
      dataAiHint: '3d model engine',
      reviews: 95,
      rating: 4,
      description: 'High-performance 3D object and particle render engine for After Effects.',
      price: 99,
      originalPrice: 2999,
      discount: '97% OFF',
      platform: 'Mac Only'
    },
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

const StarRating = ({ rating, count }: { rating: number, count: number }) => {
    return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`} />
                ))}
            </div>
            <span>({count} reviews)</span>
        </div>
    )
}

const StoreItemCard = ({ item }: { item: any }) => {
  const isPlugin = item.hasOwnProperty('price');

  if (isPlugin) {
    return (
      <motion.div variants={itemVariants}>
        <Card className="flex flex-col h-full bg-secondary/50 backdrop-blur-sm border-white/10 shadow-lg transition-all duration-300 overflow-hidden group">
          <CardHeader className="p-0 aspect-video overflow-hidden relative">
            <Image
              src={item.image}
              alt={item.name}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint}
            />
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                {item.platform === 'Mac & Windows' ? <Check className="h-3 w-3 text-green-400" /> : <Apple className="h-3 w-3" />} {item.platform}
            </div>
             <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {item.discount}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-headline mb-2">{item.name}</h3>
            <div className="mb-2">
                <StarRating rating={item.rating} count={item.reviews} />
            </div>
            <p className="text-base text-muted-foreground mb-4 flex-grow">{item.description}</p>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">₹{item.price}</span>
                    <span className="text-base text-muted-foreground line-through">₹{item.originalPrice}</span>
                </div>
                <Button className="font-semibold">Buy Now</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Fallback for other categories
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
              Download
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

const AfterEffectsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M31.25 6.6C30.05 3.9 27.2 2.1 24.2 2.1C20.6 2.1 17.85 4.35 16.7 7.85L12.95 20.9H18.05L19.2 16.85C20.15 14.1 22.05 12.8 24.2 12.8C25.9 12.8 27.25 13.7 27.9 15.35L22.25 28.55C21.1 31.9 18.25 34.05 14.85 34.05C11.35 34.05 8.5 31.8 7.4 28.3L11.1 15.25H6L2 28.4C3.15 31.95 6.05 34.2 9.5 34.2C13.1 34.2 15.95 31.95 17.1 28.45L20.85 15.4H15.75L14.6 19.3C13.65 22.05 11.75 23.35 9.5 23.35C7.8 23.35 6.45 22.45 5.8 20.8L11.55 7.6C12.7 4.25 15.55 2.1 18.95 2.1C22.45 2.1 25.3 4.35 26.4 7.85L22.7 20.9H27.8L31.25 11.75H36L31.25 6.6Z" fill="url(#paint0_linear_1_2)"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="2" y1="18.175" x2="36" y2="18.175" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F06"/>
                <stop offset="1" stopColor="#8338EC"/>
            </linearGradient>
        </defs>
    </svg>
);


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

            <motion.div key="plugins" variants={sectionVariants} className="mb-20">
                <motion.h2 variants={itemVariants} className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-bold font-headline mb-8 capitalize">
                  <AfterEffectsIcon />
                  After Effects Plugins
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {storeItems.plugins.map((item) => (
                    <StoreItemCard key={item.name} item={item} />
                  ))}
                </div>
              </motion.div>

            {Object.entries(storeItems).map(([category, items]) => {
              if (category === 'plugins') return null;
              return (
              <motion.div key={category} variants={sectionVariants} className="mb-20">
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-headline mb-8 capitalize text-center">
                  {category.replace(/([A-Z])/g, ' $1')}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.map((item) => (
                    <StoreItemCard key={item.name} item={item} />
                  ))}
                </div>
              </motion.div>
            )})}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
    

    

    
