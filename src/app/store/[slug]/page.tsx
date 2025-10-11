
"use client";

import { notFound, useParams } from 'next/navigation';
import { storeItems } from '@/lib/store-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Star, Check, Apple, ArrowLeft, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


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

const ReviewForm = ({ itemName }: { itemName: string }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        rating: z.coerce.number().min(1, { message: "Please select a rating." }).max(5),
        review: z.string().min(10, { message: "Review must be at least 10 characters." }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            rating: 0,
            review: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // In a real app, you would submit this data to a backend.
        console.log({ ...values, item: itemName });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
            title: "Review Submitted!",
            description: "Thank you for your feedback.",
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
                            <FormLabel>Your Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-6 w-6 cursor-pointer ${field.value >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                                            onClick={() => field.onChange(star)}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Review</FormLabel>
                            <FormControl><Textarea placeholder="Share your thoughts on the plugin..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Review
                </Button>
            </form>
        </Form>
    );
};


const reviews = [
    {
      id: 1,
      author: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      rating: 5,
      date: '2 weeks ago',
      content: 'This plugin is a game-changer! The shadows are incredibly realistic and easy to control. Saved me hours of work on my last project. Highly recommended!',
      reply: {
        author: 'Dev Kumar Das',
        date: '1 week ago',
        content: "Thanks Alex! So glad to hear you're finding it useful. Let me know if you have any feature requests!"
      }
    },
    {
      id: 2,
      author: 'Samantha Lee',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
      rating: 4,
      date: '1 month ago',
      content: "Really powerful tool. There's a bit of a learning curve with all the settings, but the results are worth it. The installation video was super helpful.",
      reply: null
    }
];

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const allItems = [
        ...storeItems.plugins,
        ...storeItems.templates,
        ...storeItems.applications,
    ];
    
    const item = allItems.find(item => item.slug === slug);

    if (!item) {
        notFound();
    }

    const isPlugin = 'price' in item;

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1 pt-24">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        
                        <div className="space-y-4 sticky top-28">
                             <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                                 {isPlugin && item.discount && (
                                     <Badge variant="destructive" className="absolute top-4 right-4 z-10 text-base">
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
                                />
                            </div>
                        </div>

                        
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-5xl font-bold font-headline">{item.name}</h1>
                                {isPlugin && (
                                     <div className="flex items-center gap-4 flex-wrap">
                                         <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                            {item.platform === 'Mac & Windows' ? <Check className="h-5 w-5 text-green-500" /> : <Apple className="h-4 w-4" />} {item.platform}
                                        </div>
                                        <StarRating rating={item.rating} count={item.reviews} size="h-5 w-5" />
                                     </div>
                                )}
                                <p className="text-base text-muted-foreground">
                                    {'longDescription' in item ? item.longDescription : item.description}
                                </p>
                            </div>

                            {isPlugin && (
                                <Alert className="bg-primary/10 border-primary/20 text-foreground">
                                    <TriangleAlert className="h-4 w-4 !text-primary" />
                                    <AlertTitle className="font-bold !text-primary-foreground">Important</AlertTitle>
                                    <AlertDescription className="text-muted-foreground">
                                    If the payment page doesn't load, press Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows) to force a refresh.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {isPlugin && (
                                <div className="space-y-4 rounded-lg bg-secondary/50 p-6">
                                     <div className="flex items-baseline gap-4">
                                        <span className="text-5xl font-bold text-primary">₹{item.price}</span>
                                        <span className="text-2xl text-muted-foreground line-through">₹{item.originalPrice}</span>
                                    </div>
                                    <Button size="lg" className="w-full font-bold text-lg py-6">Buy Now</Button>
                                </div>
                            )}

                            {!isPlugin && (
                                 <Button asChild size="lg" className="w-full font-bold">
                                    <a href="#support">Contact Support</a>
                                </Button>
                            )}
                        </div>
                    </div>
                     
                    <Separator className="my-12" />

                    <div className="max-w-4xl mx-auto">
                        {item.installVideo && (
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold font-headline mb-6 text-center">How to Install</h2>
                                <div className="aspect-video w-full overflow-hidden rounded-lg border border-border shadow-lg">
                                    <video src={item.installVideo} controls className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-8 mb-12">
                            <h2 className="text-3xl font-bold font-headline text-center">Reviews & Ratings</h2>
                            {reviews.map(review => (
                                <div key={review.id} className="bg-secondary/30 p-6 rounded-lg border border-border">
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src={review.avatar} />
                                            <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold">{review.author}</p>
                                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                                </div>
                                                <StarRating rating={review.rating} size="h-4 w-4" />
                                            </div>
                                            <p className="mt-2 text-muted-foreground">{review.content}</p>
                                        </div>
                                    </div>
                                    {review.reply && (
                                        <div className="mt-4 pl-10 ml-4 border-l border-border">
                                            <div className="flex items-start gap-4 pl-4">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback>DKD</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-semibold text-primary">{review.reply.author}</p>
                                                            <p className="text-xs text-muted-foreground">{review.reply.date}</p>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-muted-foreground">{review.reply.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <Card className="sticky top-28 bg-secondary/30 border-border" id="support">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Leave a Review</CardTitle>
                                <CardDescription>Share your experience with others.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ReviewForm itemName={item.name} />
                            </CardContent>
                        </Card>
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

    