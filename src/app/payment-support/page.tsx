
"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CreditCard, Upload, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const supportFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  emailAddress: z.string().email({ message: 'Please enter a valid email address.' }),
  whatsapp: z.string().optional(),
  paymentId: z.string().min(1, { message: 'Payment ID is required.' }),
  paymentScreenshot: z.any().optional(), // In a real app, you'd have more specific validation
  issue: z.string().min(10, { message: 'Please describe your issue in at least 10 characters.' }),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function PaymentSupportPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      fullName: '',
      emailAddress: '',
      whatsapp: '',
      paymentId: '',
      issue: '',
    },
  });

  const onSubmit: SubmitHandler<SupportFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log(data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Support Request Submitted',
      description: 'We have received your request and will get back to you within 24 hours.',
    });

    form.reset();
    setFileName('');
    setIsSubmitting(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      form.setValue('paymentScreenshot', e.target.files);
    } else {
      setFileName('');
      form.setValue('paymentScreenshot', null);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-secondary/30 text-foreground">
      <Header />
      <main className="flex-1 pt-24 bg-background">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="container mx-auto px-4 md:px-6 py-16"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Payment &amp; Support</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-8">
              <Card className="bg-card">
                <CardHeader className="flex flex-row items-center gap-4">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline text-xl">Payment Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We accept payments through Razorpay, which supports UPI, Credit/Debit Cards, Net Banking, and various wallets. All transactions are secure and encrypted.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-destructive/50 bg-destructive/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                  <CardTitle className="font-headline text-xl text-destructive-foreground">Important Notice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-red-500">No Refund Policy</h4>
                    <p className="text-muted-foreground">
                      Due to the digital nature of our products, all sales are final. We do not offer refunds or exchanges once a purchase is complete.
                    </p>
                  </div>
                  <div className="border-t border-destructive/30 pt-4">
                    <h4 className="font-semibold">I paid for a digital product but did not receive the download link. What should I do?</h4>
                    <p className="text-muted-foreground">
                      If you encounter any issues after payment, please use the contact form below. Attach a screenshot of your payment, and we will send the download link to your email or WhatsApp after verification.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div>
              <Card className="bg-card p-6 md:p-8">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-headline text-2xl">Contact Support</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    If you paid for the product but did not receive the download link, please fill out the form below. We will send the link to your email or WhatsApp after verification.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="emailAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
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

                      <div className="grid sm:grid-cols-2 gap-6">
                         <FormField
                          control={form.control}
                          name="paymentId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment ID</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., pay_xxxxxxxxxxxxxx" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentScreenshot"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Payment Screenshot</FormLabel>
                                <FormControl>
                                  <label className="relative flex items-center justify-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background cursor-pointer hover:bg-accent hover:text-accent-foreground">
                                    <Upload className="mr-2 h-4 w-4" />
                                    <span>{fileName || 'Choose file'}</span>
                                    <input 
                                      type="file" 
                                      className="sr-only" 
                                      onChange={handleFileChange}
                                      accept="image/*"
                                    />
                                  </label>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="issue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Describe Your Issue</FormLabel>
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
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-[#ff7f00] hover:bg-[#ff7f00]/90 text-white font-bold py-3 text-base">
                           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           Submit Support Request
                        </Button>
                        <p className="text-xs text-muted-foreground mt-3">We usually reply within 24 hours.</p>
                      </div>

                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}