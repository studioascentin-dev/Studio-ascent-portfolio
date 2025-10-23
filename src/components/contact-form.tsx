
"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PartyPopper } from "lucide-react";
import * as React from "react";
import { sendEmail } from "@/ai/flows/send-email";
import { useSearchParams } from "next/navigation";
import { pricingData } from "@/lib/pricing-data";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  service: z.string().min(1, { message: "Please select a service." }),
  servicePlan: z.string().min(1, { message: "Please select a plan." }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const searchParams = useSearchParams();
  const planParam = searchParams.get('service');
  
  let initialService = "";
  let initialPlan = "";

  if(planParam) {
    for (const service of Object.values(pricingData)) {
      if (service.tiers.some(tier => tier.name === planParam)) {
        initialService = service.title;
        initialPlan = planParam;
        break;
      }
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: initialService,
      servicePlan: initialPlan,
      message: "",
    },
  });

  const selectedServiceTitle = useWatch({
    control: form.control,
    name: 'service',
  });

  React.useEffect(() => {
    const currentServiceData = Object.values(pricingData).find(s => s.title === selectedServiceTitle);
    const availablePlans = currentServiceData ? currentServiceData.tiers : [];
    
    if (form.getValues('servicePlan') && !availablePlans.some(p => p.name === form.getValues('servicePlan'))) {
       form.resetField('servicePlan', { defaultValue: '' });
    }
  }, [selectedServiceTitle, form]);
  
  React.useEffect(() => {
    if (initialService && initialPlan) {
      form.setValue('service', initialService);
      form.setValue('servicePlan', initialPlan);
    }
  }, [initialService, initialPlan, form]);


  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
        const currentServiceData = Object.values(pricingData).find(s => s.title === data.service);
        const planPrice = currentServiceData?.tiers.find(p => p.name === data.servicePlan)?.price;
        const serviceText = `${data.servicePlan} (${planPrice || 'Price not found'})`;

        const emailResult = await sendEmail({
            ...data,
            service: serviceText,
        });

        if (emailResult.success) {
            toast({
                title: (
                  <div className="flex items-center gap-3">
                    <PartyPopper className="h-8 w-8 text-primary animate-bounce" />
                    <span className="text-xl font-bold">Message Sent!</span>
                  </div>
                ),
                description: (
                  <div className="mt-2 text-base">
                    <p>Thanks for reaching out! I'll get back to you shortly.</p>
                    <p className="font-semibold mt-2">Please check your email (and spam folder) regularly for my reply.</p>
                  </div>
                ),
                duration: 8000, 
            });
            form.reset({
                name: "",
                email: "",
                service: "",
                servicePlan: "",
                message: "",
            });
        } else {
             toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: emailResult.error || "There was a problem with your request.",
            });
        }
    } catch (error: any) {
        console.error("Failed to send message:", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message || "There was a problem with your request.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const selectedServiceData = Object.values(pricingData).find(s => s.title === selectedServiceTitle);
  const availablePlans = selectedServiceData ? selectedServiceData.tiers : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
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
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {Object.values(pricingData).map((service) => (
                            <SelectItem key={service.key} value={service.title}>
                                {service.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="servicePlan"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Service Plan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""} disabled={!selectedServiceTitle}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {availablePlans.map((plan) => (
                            <SelectItem key={plan.name} value={plan.name}>
                                {plan.name} - {plan.price}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me a little bit about your project"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </form>
    </Form>
  );
}
