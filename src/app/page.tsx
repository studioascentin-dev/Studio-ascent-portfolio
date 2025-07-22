"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection suggestedProjects={[]} />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
