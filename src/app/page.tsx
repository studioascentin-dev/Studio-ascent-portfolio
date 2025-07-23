
"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { StudioStoreSection } from '@/components/studio-store-section';
import { PricingSection } from '@/components/pricing-section';
import { HireMeSection } from '@/components/hire-me-section';
import { Footer } from '@/components/footer';
import * as React from 'react';

export default function Home() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const pricingRef = React.useRef<HTMLDivElement>(null);
  const hireMeRef = React.useRef<HTMLDivElement>(null);
  const storeRef = React.useRef<HTMLDivElement>(null);

  const videoEditingRef = React.useRef<HTMLDivElement>(null);
  const photoEditingRef = React.useRef<HTMLDivElement>(null);
  const pptDesignRef = React.useRef<HTMLDivElement>(null);
  const webDesignRef = React.useRef<HTMLDivElement>(null);
  const webDevelopmentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header refs={{ aboutRef, videoEditingRef, photoEditingRef, pptDesignRef, webDesignRef, webDevelopmentRef, storeRef, pricingRef, hireMeRef }} />
      <main className="flex-1">
        <div id="hero-section" ref={aboutRef}>
            <HeroSection />
        </div>
        <ServicesSection refs={{ videoEditingRef, photoEditingRef, pptDesignRef, webDesignRef, webDevelopmentRef }} />
        <div id="store" ref={storeRef}>
          <StudioStoreSection />
        </div>
        <div id="pricing" ref={pricingRef}>
            <PricingSection />
        </div>
        <div id="hire-me" ref={hireMeRef}>
            <HireMeSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
