
"use client";

import { notFound, useParams } from 'next/navigation';
import { storeItems } from '@/lib/store-data';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Star, Check, Apple, ArrowLeft, TriangleAlert, Download, Info, MessageSquare, Wallet, Lock, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { sendSupportEmail } from '@/ai/flows/send-support-email';


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

const replyFormSchema = z.object({
  reply: z.string().min(1, { message: "Reply cannot be empty." }),
});

const ReplyForm = ({ onReply, onCancel }: { onReply: (data: z.infer<typeof replyFormSchema>) => void, onCancel: () => void }) => {
    const form = useForm<z.infer<typeof replyFormSchema>>({
        resolver: zodResolver(replyFormSchema),
        defaultValues: { reply: "" },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onReply)} className="mt-4 space-y-4">
                <FormField
                    control={form.control}
                    name="reply"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="sr-only">Reply</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Write a reply..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" size="sm">Post Reply</Button>
                </div>
            </form>
        </Form>
    );
};

const reviewFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    rating: z.coerce.number().min(1, { message: "Please select a rating." }).max(5),
    review: z.string().min(10, { message: "Review must be at least 10 characters." }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const ReviewForm = ({ itemName, onReviewSubmit }: { itemName: string, onReviewSubmit: (data: ReviewFormValues) => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            name: "",
            rating: 0,
            review: "",
        },
    });

    async function onSubmit(values: ReviewFormValues) {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        onReviewSubmit(values);

        toast({
            title: "Review Submitted!",
            description: "Thank you for your feedback.",
        });

        form.reset();
        setIsSubmitting(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
                                            aria-label={`Rate ${star} out of 5 stars`}
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
        try {
            const emailResult = await sendSupportEmail({
                ...data,
                productName,
            });

            if (emailResult.success) {
                toast({
                    title: 'Support Request Submitted',
                    description: 'We have received your request and will get back to you within 24 hours.',
                });
                form.reset();
            } else {
                 throw new Error(emailResult.error || 'Failed to send email.');
            }

        } catch (error: any) {
            console.error("Failed to send support request:", error);
            
            toast({
                variant: "destructive",
                title: "Submission Failed",
                description: error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
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

const initialReviews = [
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
    const { toast } = useToast();

    const [reviews, setReviews] = useState(initialReviews);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);

    const handleReplySubmit = (reviewId: number, data: z.infer<typeof replyFormSchema>) => {
        console.log(`Replying to review ${reviewId}:`, data.reply);
        toast({
            title: "Reply Posted",
            description: "Your reply has been submitted for approval.",
        });
        setReplyingTo(null); // Close the form
    };

    const handleReviewSubmit = (data: ReviewFormValues) => {
        const newReview = {
            id: Date.now(),
            author: data.name,
            avatar: `https://i.pravatar.cc/150?u=${data.name}`,
            rating: data.rating,
            date: 'Just now',
            content: data.review,
            reply: null,
        };
        setReviews(prevReviews => [newReview, ...prevReviews]);
    };

    const handleDeleteReview = (reviewId: number) => {
        setReviews(prevReviews => prevReviews.filter(r => r.id !== reviewId));
        toast({
            title: "Review Deleted",
            description: "The review has been removed.",
        });
    };

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
                <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                        
                        <div className="space-y-6 md:sticky md:top-28">
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                                {isPlugin && item.discount && (
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
                        </div>

                        
                        <div className="space-y-4 md:space-y-6">
                            <div className="space-y-2 md:space-y-3">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">{item.name}</h1>
                                {isPlugin && (
                                     <div className="flex items-center gap-4 flex-wrap">
                                         <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                            {item.platform === 'Mac & Windows' ? <Check className="h-5 w-5 text-green-500" /> : <Apple className="h-4 w-4" />} {item.platform}
                                        </div>
                                        <StarRating rating={item.rating} count={item.reviews} size="h-5 w-5" />
                                     </div>
                                )}
                                <p className="text-sm md:text-base text-muted-foreground">
                                    {'longDescription' in item ? item.longDescription : item.description}
                                </p>
                            </div>

                            {isPlugin && (
                                <div className="space-y-4 rounded-lg bg-secondary/50 p-4 md:p-6">
                                     <div className="flex items-baseline gap-2 md:gap-4">
                                        <span className="text-4xl md:text-5xl font-bold text-primary">₹{item.price}</span>
                                        <span className="text-xl md:text-2xl text-muted-foreground line-through">₹{item.originalPrice}</span>
                                    </div>
                                    <Button asChild size="lg" className="w-full font-bold text-base md:text-lg py-4 md:py-6">
                                        <Link href={item.paymentLink || '#'} target="_blank" rel="noopener noreferrer">Buy Now</Link>
                                    </Button>
                                    <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                        <Lock className="h-4 w-4" /> Secured by Razorpay
                                    </p>
                                </div>
                            )}

                             {isPlugin && (
                                <Alert className="bg-primary/10 border-primary/20 text-foreground">
                                    <TriangleAlert className="h-4 w-4 !text-primary" />
                                    <AlertTitle className="font-bold !text-primary-foreground">Important</AlertTitle>
                                    <AlertDescription className="text-muted-foreground text-sm">
                                    If the payment page doesn't load, press Cmd + Shift + R (Mac) or Ctrl + Shift + R (Windows) to force a refresh.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {!isPlugin && (
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
                                <Card className="bg-secondary/50 backdrop-blur-sm border-border p-6 md:p-8">
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <Info className="h-8 w-8 md:h-10 md:w-10 text-primary mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl mb-1">Installation</h3>
                                            <p className="text-muted-foreground text-sm md:text-base">{item.details.installation}</p>
                                        </div>
                                    </div>
                                </Card>
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
                        {item.installVideo && (
                            <section className="mb-12 md:mb-16" aria-labelledby="installation-video-heading">
                                <h2 id="installation-video-heading" className="text-2xl md:text-3xl font-bold font-headline mb-6 md:mb-8 text-center">How to Install</h2>
                                <div className="aspect-video max-w-4xl mx-auto w-full overflow-hidden rounded-lg border border-border shadow-lg">
                                    <video src={item.installVideo} controls className="w-full h-full object-cover" title={`Installation video for ${item.name}`} />
                                </div>
                            </section>
                        )}

                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <section className="space-y-8" aria-labelledby="reviews-heading">
                                <h2 id="reviews-heading" className="text-2xl md:text-3xl font-bold font-headline">Reviews & Ratings</h2>
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                    <article key={review.id} className="bg-secondary/30 p-4 md:p-6 rounded-lg border border-border">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarImage src={review.avatar} alt={`${review.author}'s avatar`} />
                                                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold text-sm md:text-base">{review.author}</p>
                                                        <p className="text-xs text-muted-foreground">{review.date}</p>
                                                    </div>
                                                    <StarRating rating={review.rating} size="h-4 w-4" />
                                                </div>
                                                <p className="mt-2 text-muted-foreground text-sm">{review.content}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button variant="ghost" size="sm" className="-ml-3 h-auto py-1 px-3 text-xs" onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}>
                                                        <MessageSquare className="mr-2 h-3.5 w-3.5" />
                                                        Reply
                                                    </Button>
                                                     <Button variant="ghost" size="sm" className="h-auto py-1 px-3 text-xs text-destructive/70 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteReview(review.id)}>
                                                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                                                        Delete
                                                    </Button>
                                                </div>

                                                {replyingTo === review.id && (
                                                    <ReplyForm 
                                                        onCancel={() => setReplyingTo(null)}
                                                        onReply={(data) => handleReplySubmit(review.id, data)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        {review.reply && (
                                            <div className="mt-4 pl-8 ml-4 border-l border-border md:pl-10">
                                                <div className="flex items-start gap-4 pl-4">
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarFallback>DKD</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="font-semibold text-primary text-sm md:text-base">{review.reply.author}</p>
                                                                <p className="text-xs text-muted-foreground">{review.reply.date}</p>
                                                            </div>
                                                        </div>
                                                        <p className="mt-2 text-muted-foreground text-sm">{review.reply.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                ))
                                ) : (
                                    <p className="text-muted-foreground text-sm">No reviews yet. Be the first to leave one!</p>
                                )}
                            </section>

                            <div className="space-y-8 sticky top-28">
                                <section aria-labelledby="leave-review-heading">
                                    <Card className="bg-secondary/30 border-border" id="review">
                                        <CardHeader>
                                            <CardTitle id="leave-review-heading" className="font-headline text-xl md:text-2xl">Leave a Review</CardTitle>
                                            <CardDescription className="text-sm">Share your experience with others.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ReviewForm itemName={item.name} onReviewSubmit={handleReviewSubmit} />
                                        </CardContent>
                                    </Card>
                                </section>
                            </div>
                        </div>

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
                                            <p>If you encounter any issues after payment, please use the contact form below. Attach a screenshot of your payment, and we will send the download link to your email or WhatsApp after verification.</p>
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
