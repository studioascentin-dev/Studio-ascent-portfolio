
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
import { storeItems } from '@/lib/store-data';
import Link from 'next/link';

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
  const isPlugin = 'price' in item;

  return (
    <motion.article variants={itemVariants} className="h-full">
      <Link href={`/store/${item.slug}`} className="block h-full group">
        <Card className="flex flex-col h-full bg-secondary/50 backdrop-blur-sm border-white/10 shadow-lg transition-all duration-300 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-primary/20">
          <CardHeader className="p-0 aspect-video overflow-hidden relative">
            <Image
              src={item.image}
              alt={item.name}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint}
            />
            {isPlugin && (
              <>
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  {item.platform === 'Mac & Windows' ? <Check className="h-3 w-3 text-green-400" /> : <Apple className="h-3 w-3" />} {item.platform}
                </div>
                {item.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                    {item.discount}
                  </div>
                )}
              </>
            )}
          </CardHeader>
          <CardContent className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold font-headline mb-2 flex-grow group-hover:text-primary transition-colors">{item.name}</h3>
            {isPlugin && item.reviews && (
              <div className="mb-2">
                <StarRating rating={item.rating} count={item.reviews} />
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
            <div className="flex items-center justify-between mt-auto">
              {isPlugin ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
                </div>
              ) : (
                <div></div> 
              )}
              <Button className="font-semibold pointer-events-none" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.article>
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
  const storeCategories = {
    plugins: {
      title: 'After Effects Plugins',
      items: storeItems.plugins,
    },
    projectFiles: {
      title: 'Project files [Youtube and Instagram]',
      items: storeItems.projectFiles,
    },
    applications: {
      title: 'Applications',
      items: storeItems.applications,
    },
  };

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
            <motion.header variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tighter">
                Digital Product Store
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-xl/relaxed text-muted-foreground">
                High-quality plugins, templates, and applications to level up your creative projects.
              </p>
            </motion.header>

            {Object.entries(storeCategories).map(([key, category]) => {
              if (!category.items || category.items.length === 0) return null;
              return (
                <motion.section key={key} variants={sectionVariants} className="mb-16 md:mb-20" aria-labelledby={`${key}-heading`}>
                  <motion.h2 variants={itemVariants} id={`${key}-heading`} className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-bold font-headline mb-8 capitalize">
                    {key === 'plugins' && <AfterEffectsIcon className="w-8 h-8 md:w-9 md:h-9" />}
                    {category.title}
                  </motion.h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {category.items.map((item: any) => (
                      <StoreItemCard key={item.slug} item={item} />
                    ))}
                  </div>
                </motion.section>
              )
            })}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
