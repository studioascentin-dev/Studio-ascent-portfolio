
"use client";

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const faqs = [
    {
        question: "What is your refund policy for digital products?",
        answer: "All sales of digital products are final. Due to their immediate and irreversible nature, we do not offer refunds or exchanges once a purchase is complete. Please read the product descriptions carefully before buying. You can find more details in our Refund Policy.",
        category: "Digital Products"
    },
    {
        question: "I paid but did not receive the download link. What should I do?",
        answer: "If you don't receive your download link after a successful payment, please use the 'Payment & Support' form on the product page or at the bottom of the store page. Provide your name, email, and Payment ID, and we will send you the link promptly after verification.",
        category: "Digital Products"
    },
    {
        question: "Are your After Effects plugins compatible with Windows?",
        answer: "Most of our current plugins are Mac-only unless specified otherwise (like Shadow Studio 3). Please check the 'Platform' detail on each product page before purchasing to ensure compatibility with your system.",
        category: "Digital Products"
    },
    {
        question: "How do I start a project with you (e.g., web development, video editing)?",
        answer: "The best way to start is by filling out the contact form on our homepage. Tell us about your project, your goals, and any specific requirements. We'll get back to you to discuss the details and next steps.",
        category: "Services"
    },
    {
        question: "How many revisions are included in your service-based projects?",
        answer: "The number of revisions depends on the specific service and project scope. For example, our video editing pricing tiers include a specific number of revisions. We will clarify this with you in our project proposal before we begin any work.",
        category: "Services"
    },
    {
        question: "What payment methods do you accept?",
        answer: "For our digital products, we use Razorpay, which accepts a wide range of payment methods including UPI, credit/debit cards, and net banking. For services, we typically arrange payment terms directly with the client.",
        category: "General"
    },
];

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

export default function FAQPage() {
  const categories = [...new Set(faqs.map(faq => faq.category))];

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
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-xl/relaxed text-muted-foreground">
                Find answers to common questions about our products and services.
              </p>
            </motion.div>

            <motion.div 
                variants={itemVariants}
                className="max-w-3xl mx-auto"
            >
              {categories.map(category => (
                <div key={category} className="mb-10">
                  <h2 className="text-2xl font-bold font-headline mb-6 border-b-2 border-primary pb-2">{category}</h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.filter(faq => faq.category === category).map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="bg-secondary/30 border border-border rounded-lg px-6">
                        <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm md:text-base pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="text-center mt-12 md:mt-16">
                <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </motion.div>

          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
