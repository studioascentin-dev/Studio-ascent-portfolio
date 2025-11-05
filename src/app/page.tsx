
'use client';

import { AboutSection } from '@/components/about-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { HireMeSection } from '@/components/hire-me-section';
import { PageTransition } from '@/components/page-transition';
import { ServicesSection } from '@/components/services-section';
import { TestimonialsSection } from '@/components/testimonials-section';

export default function Home() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <HireMeSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}
