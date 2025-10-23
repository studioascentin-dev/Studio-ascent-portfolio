
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { sendEmail } from "@/ai/flows/send-email";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const servicePlanMap = {
    "Video Editing": [
        "Basic Video Editing",
        "Intermediate Video Editing",
        "Pro Video Editing",
    ],
    "AI Chatbot": [
        "FAQ/Support Bot",
        "Booking Bot",
        "GPT-Powered Bot",
    ],
    "Web Development": [
        "Basic Web Development",
        "Intermediate Web Development",
        "Enterprise Web Development",
    ],
};

const services = Object.keys(servicePlanMap);

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
  const serviceParam = searchParams.get('service');
  
  let initialService = "";
  let initialPlan = "";

  if(serviceParam) {
    for (const [service, plans] of Object.entries(servicePlanMap)) {
      if (plans.includes(serviceParam)) {
        initialService = service;
        initialPlan = serviceParam;
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

  const selectedService = useWatch({
    control: form.control,
    name: 'service',
  });

  React.useEffect(() => {
    // Reset servicePlan when service changes, unless it's the initial load with a valid plan
    if (form.getValues('servicePlan') && !servicePlanMap[selectedService as keyof typeof servicePlanMap]?.includes(form.getValues('servicePlan'))) {
       form.resetField('servicePlan');
    }
  }, [selectedService, form]);
  
  React.useEffect(() => {
    if (initialService && initialPlan) {
      form.setValue('service', initialService);
      form.setValue('servicePlan', initialPlan);
    }
  }, [initialService, initialPlan, form]);


  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
        const emailResult = await sendEmail({
            ...data,
            service: `${data.service} - ${data.servicePlan}`, // Combine for email
        });

        if (emailResult.success) {
            toast({
                title: 'Message Sent!',
                description: 'Thanks for reaching out. I\'ll get back to you shortly.',
            });
            form.reset({
                name: "",
                email: "",
                service: "",
                servicePlan: "",
                message: "",
            });
        } else {
            throw new Error(emailResult.error || 'Failed to send email.');
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

  const availablePlans = selectedService ? servicePlanMap[selectedService as keyof typeof servicePlanMap] : [];

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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {services.map((service) => (
                            <SelectItem key={service} value={service}>
                                {service}
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
                    <Select onValueChange={field.onChange} value={field.value} disabled={!selectedService}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {availablePlans.map((plan) => (
                            <SelectItem key={plan} value={plan}>
                                {plan}
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
