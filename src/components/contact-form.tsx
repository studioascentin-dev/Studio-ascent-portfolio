
"use client";

import { useForm } from "react-hook-form";
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


const serviceOptions = [
    {
        label: "General Services",
        options: [
            "Photo Editing",
            "Video Editing",
            "AI Chatbot",
            "Web Development",
        ]
    },
    {
        label: "Video Editing Plans",
        options: [
            "Basic Video Editing",
            "Intermediate Video Editing",
            "Pro Video Editing",
        ]
    },
    {
        label: "AI Chatbot Plans",
        options: [
            "FAQ/Support Bot",
            "Booking Bot",
            "GPT-Powered Bot",
        ]
    },
    {
        label: "Web Development Plans",
        options: [
            "Basic Web Development",
            "Intermediate Web Development",
            "Enterprise Web Development",
        ]
    },
     {
        label: "Other",
        options: [
            "Something Else",
        ]
    }
];

const allServices = serviceOptions.flatMap(group => group.options);

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function ContactFormComponent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const searchParams = useSearchParams();
  const serviceQuery = searchParams.get('service');

  React.useEffect(() => {
    if (serviceQuery) {
      const decodedService = decodeURIComponent(serviceQuery);
      if (allServices.includes(decodedService)) {
        form.setValue("service", decodedService);
      }
    }
  }, [serviceQuery, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
        const emailResult = await sendEmail(values);
        
        if (emailResult.success) {
            toast({
                title: "Message Sent!",
                description: "Thanks for reaching out. I'll get back to you soon.",
            });
            form.reset();
        } else {
            throw new Error(emailResult.error || "Failed to send email.");
        }

    } catch (error: any) {
        console.error("Error submitting form:", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message || "There was a problem sending your message.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-background/50 backdrop-blur-sm border p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        
        <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service you're interested in" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {serviceOptions.map(group => (
                                <SelectGroup key={group.label}>
                                    <SelectLabel>{group.label}</SelectLabel>
                                    {group.options.map(option => (
                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
        
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
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </Button>
      </form>
    </Form>
  );
}

export function ContactForm() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <ContactFormComponent />
        </React.Suspense>
    )
}
