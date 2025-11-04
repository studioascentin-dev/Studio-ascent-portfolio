
"use client";

import { notFound, useParams } from 'next/navigation';
import { storeItems } from '@/lib/store-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Star, Check, Apple, ArrowLeft, TriangleAlert, Download, Info, MessageSquare, Wallet, Lock, Trash2, Youtube, Send } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RazorpayButton } from '@/components/razorpay-button';


const StarRating = ({ rating, count, size = 'h-5 w-5' }: { rating: number, count?: number, size?: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`${size} ${i < rating ? 'fill-current' : 'text-gray-500'}`} />
                ))}
            </div>
            {count && <span className="text-sm text-muted-foreground">({count} reviews)</span>}
        </div>
    );
};

const supportFormSchema = z.object({
  name: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: z.string().optional(),
  paymentId: z.string().min(1, { message: 'Payment ID is required.' }),
  message: z.string().min(10, { message: 'Please describe your issue in at least 10 characters.' }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const SupportForm = ({productName}: {productName: string}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      paymentId: '',
      message: '',
    },
  });

    const onSubmit = async (data: SupportFormValues) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
            title: 'Support Request Submitted',
            description: 'We have received your request and will get back to you within 24 hours.',
        });
        form.reset();
        
        setIsSubmitting(false);
    };

  return (
    <Card className="bg-secondary/30 border-border" id="support">
        <CardHeader>
            <CardTitle className="font-headline text-xl md:text-2xl">Contact Support</CardTitle>
            <CardDescription className="text-sm">If you paid for the product but did not receive the download link, please fill out the form below. We will send the link to your email or WhatsApp after verification.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>WhatsApp (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="+91 12345 67890" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
                <FormField
                    control={form.control}
                    name="paymentId"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Payment ID <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                        <Input placeholder="pay_xxxxxxxxxxxxxx" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">Find this in your Razorpay payment confirmation email. It starts with "pay_".</FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Describe Your Issue <span className="text-destructive">*</span></FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="e.g., Payment was successful but I did not receive the download link."
                        className="min-h-[100px]"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="text-center">
                <Button type="submit" disabled={isSubmitting} className="w-full font-bold py-3 text-base">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Support Request
                </Button>
                <p className="text-xs text-muted-foreground mt-3">We usually reply within 24 hours.</p>
                </div>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
};

const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    let videoId = '';
    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        return url;
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const allItems = [
        ...storeItems.plugins,
        ...storeItems.projectFiles,
    ];
    
    const item = allItems.find(item => item.slug === slug) as any;

    if (!item) {
        notFound();
    }

    const isPlugin = 'price' in item && 'originalPrice' in item && storeItems.plugins.some(p => p.slug === item.slug);
    const isProjectFile = 'price' in item && 'originalPrice' in item && storeItems.projectFiles.some(p => p.slug === item.slug);
    const isPricedItem = isPlugin || isProjectFile;
    const isRazorpayButton = 'paymentLink' in item && item.paymentLink.startsWith('pl_');

    const totalReviews = item.reviews || 0;
    const averageRating = item.rating || 0;

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                     <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        <div className="space-y-6 md:sticky md:top-28">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                                {isPricedItem && item.discount && (
                                    <Badge variant="destructive" className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-sm md:text-base">
                                        {item.discount}
                                    </Badge>
                                )}
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={1280}
                                height={720}
                                className="w-full h-full object-cover"
                                data-ai-hint={item.dataAiHint}
                                priority
                            />
                            </div>
                             {isPricedItem && (
                                <Alert className="bg-primary/10 border-primary/20 text-foreground md:hidden">
                                    <TriangleAlert className="h-4 w-4 !text-primary" />
                                    <AlertTitle className="font-bold !text-primary-foreground">Important</AlertTitle>
                                    <AlertDescription className="text-muted-foreground text-sm">
                                    If the payment page doesn't load, press Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows) to force a refresh.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        
                        <div className="space-y-4 md:space-y-6">
                            <div className="space-y-2 md:space-y-3">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">{item.name}</h1>
                                {isPricedItem && (
                                     <div className="flex items-center gap-4 flex-wrap">
                                         <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                            {'platform' in item && item.platform === 'Mac & Windows' ? <Check className="h-5 w-5 text-green-500" /> : 'platform' in item && item.platform === 'Alight Motion' ? <Check className="h-5 w-5 text-green-500" /> : <Apple className="h-4 w-4" />} 
                                            {'platform' in item && item.platform}
                                        </div>
                                        <StarRating rating={averageRating} count={totalReviews} size="h-5 w-5" />
                                     </div>
                                )}
                                <p className="text-sm md:text-base text-muted-foreground">
                                    {'longDescription' in item ? item.longDescription : item.description}
                                </p>
                            </div>

                            {isPricedItem && (
                                <div className="space-y-2 rounded-lg bg-secondary/50 p-4 md:p-6">
                                     <div className="flex items-baseline gap-2 md:gap-4">
                                        <span className="text-4xl md:text-5xl font-bold text-primary">₹{item.price}</span>
                                        <span className="text-xl md:text-2xl text-muted-foreground line-through">₹{item.originalPrice}</span>
                                    </div>
                                    {isRazorpayButton ? (
                                        <RazorpayButton buttonId={item.paymentLink} />
                                    ) : (
                                        <Button asChild size="lg" className="w-full font-bold text-base md:text-lg py-4 md:py-6">
                                            <Link href={'paymentLink' in item ? item.paymentLink || '#' : '#'} target="_blank" rel="noopener noreferrer">Buy Now</Link>
                                        </Button>
                                    )}
                                </div>
                            )}

                             {isPricedItem && (
                                <Alert className="bg-primary/10 border-primary/20 text-foreground hidden md:block">
                                    <TriangleAlert className="h-4 w-4 !text-primary" />
                                    <AlertTitle className="font-bold !text-primary-foreground">Important</AlertTitle>
                                    <AlertDescription className="text-muted-foreground text-sm">
                                    If the payment page doesn't load, press Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows) to force a refresh.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {!isPricedItem && (
                                 <Button asChild size="lg" className="w-full font-bold">
                                    <a href="/#contact">Contact For Details</a>
                                </Button>
                            )}
                        </div>
                    </div>
                     
                    <Separator className="my-12 md:my-16" />

                    {'details' in item && item.details && (
                        <section className="max-w-4xl mx-auto mb-12 md:mb-16" aria-labelledby="product-details-heading">
                            <h2 id="product-details-heading" className="text-2xl md:text-3xl font-bold font-headline mb-6 md:mb-8 text-center">Product Details</h2>
                            <div className="space-y-4 md:space-y-6">
                                <Card className="bg-secondary/50 backdrop-blur-sm border-border p-6 md:p-8">
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <Download className="h-8 w-8 md:h-10 md:w-10 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl mb-1">File Size</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{item.details.fileSize}</p>
                                        </div>
                                    </div>
                                </Card>
                                {isPlugin && 'installation' in item.details && item.details.installation && (
                                <Card className="bg-secondary/50 backdrop-blur-sm border-border p-6 md:p-8">
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <Info className="h-8 w-8 md:h-10 md:w-10 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl mb-1">Installation</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{item.details.installation}</p>
                                        </div>
                                    </div>
                                </Card>
                                )}
                                {'youtube' in item.details && item.details.youtube && (
                                     <Card className="bg-secondary/50 backdrop-blur-sm border-border p-6 md:p-8">
                                        <div className="flex items-start gap-4 md:gap-6">
                                            <Youtube className="h-8 w-8 md:h-10 md:w-10 text-red-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-bold text-lg md:text-xl mb-1">YouTube Channel</h3>
                                                <p className="text-muted-foreground text-sm md:text-base">
                                                    For more content and tutorials, check out{' '}
                                                    <a 
                                                        href={item.details.youtube.channelUrl} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer" 
                                                        className="text-primary hover:underline"
                                                    >
                                                        {item.details.youtube.channelName}
                                                    </a>.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                                <Card className="bg-secondary/50 backdrop-blur-sm border-border p-6 md:p-8">
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <TriangleAlert className="h-8 w-8 md:h-10 md:w-10 text-yellow-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl mb-1">Important Notes</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{item.details.importantNotes}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </section>
                    )}


                    <div className="max-w-7xl mx-auto">
                        {'tutorialLink' in item && item.tutorialLink && (
                             <section className="mb-12 md:mb-16" aria-labelledby="installation-video-heading">
                                <h2 id="installation-video-heading" className="text-2xl md:text-3xl font-bold font-headline mb-6 md:mb-8 text-center">
                                    {isProjectFile ? "Preview" : "Installation Guide"}
                                </h2>
                                <div className="text-center">
                                     { item.tutorialLink.includes('youtube.com') ? (
                                        <div className="aspect-video max-w-4xl mx-auto w-full overflow-hidden rounded-lg border border-border shadow-lg">
                                            <iframe
                                                src={getEmbedUrl(item.tutorialLink)}
                                                title={`Tutorial video for ${item.name}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full object-cover"
                                            ></iframe>
                                        </div>
                                     ) : (
                                        <Button asChild size="lg">
                                            <Link href={item.tutorialLink} target="_blank" rel="noopener noreferrer">
                                                <Send className="mr-2 h-4 w-4" />
                                                View Tutorial on Telegram
                                            </Link>
                                        </Button>
                                     )}
                                </div>
                            </section>
                        )}
                        
                        <Separator className="my-12 md:my-16" />

                        <section aria-labelledby="payment-support-heading">
                            <h2 id="payment-support-heading" className="text-2xl md:text-3xl font-bold font-headline mb-6 md:mb-8 text-center">Payment & Support</h2>
                            <div className="grid md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
                                <div className="space-y-8">
                                    <Card className="bg-secondary/30 border-border p-6">
                                        <div className="flex items-start gap-4">
                                            <Wallet className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
                                            <div>
                                                <h3 className="text-lg md:text-xl font-bold mb-2">Payment Info</h3>
                                                <p className="text-muted-foreground text-sm">We accept payments through Razorpay, which supports UPI, Credit/Debit Cards, Net Banking, and various wallets. All transactions are secure and encrypted.</p>
                                            </div>
                                        </div>
                                    </Card>
                                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
                                        <TriangleAlert className="h-5 w-5 md:h-6 md:w-6 text-destructive" />
                                        <AlertTitle className="text-lg md:text-xl font-bold text-destructive-foreground">Important Notice</AlertTitle>
                                        <div className="mt-4 space-y-2 text-sm text-destructive-foreground/80">
                                            <p className="font-semibold text-destructive-foreground/90">No Refund Policy</p>
                                            <p>Due to the digital nature of our products, all sales are final. We do not offer refunds or exchanges once a purchase is complete.</p>
                                            <p className="font-semibold mt-4 text-destructive-foreground/90">I paid for a digital product but did not receive the download link. What should I do?</p>
                                            <p>If you encounter any issues after payment, please use the support form below. Provide your Payment ID, and we will send the download link to your email or WhatsApp after verification.</p>
                                        </div>
                                    </Alert>
                                </div>
                                <div className="sticky top-28">
                                    <SupportForm productName={item.name} />
                                </div>
                            </div>
                        </section>
                    </div>

                     <div className="text-center mt-16">
                        <Button asChild variant="outline" size="lg">
                            <Link href="/store">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Store
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
