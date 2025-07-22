"use client";

import { useState } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const [suggestedProjects, setSuggestedProjects] = useState<string[]>([]);
  const [projectsKey, setProjectsKey] = useState(0);

  const handleSuggestions = (suggestions: string[]) => {
    setSuggestedProjects(suggestions);
    setProjectsKey(prevKey => prevKey + 1); // Increment key to force re-render of ProjectsSection
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection onSuggestions={handleSuggestions} />
        <ServicesSection />
        <ProjectsSection key={projectsKey} suggestedProjects={suggestedProjects} />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
