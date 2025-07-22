"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import * as React from 'react';

export default function Home() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const pricingRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header refs={{ aboutRef, servicesRef, pricingRef, contactRef }} />
      <main className="flex-1">
        <div ref={aboutRef}>
            <HeroSection />
        </div>
        <div ref={servicesRef}>
            <ServicesSection />
        </div>
        <div ref={pricingRef}>
            <PricingSection />
        </div>
      </main>
      <div ref={contactRef}>
        <Footer />
      </div>
    </div>
  );
}
