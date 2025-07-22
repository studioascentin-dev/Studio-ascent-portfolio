"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import { useEffect } from 'react';
import { sayHi } from '@/ai/flows/say-hi';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { toast } = useToast();

  useEffect(() => {
    const playGreeting = async () => {
      try {
        const response = await sayHi("Hi, I'm Dev");
        if (response.media) {
          const audio = new Audio(response.media);
          audio.play();
        }
      } catch (error) {
        console.error('Error playing greeting:', error);
        toast({
          title: 'Audio Error',
          description: 'Could not play the welcome message.',
          variant: 'destructive',
        });
      }
    };
    playGreeting();
  }, [toast]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <ProjectsSection suggestedProjects={[]} />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
