
"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import * as React from 'react';
import { HireMeSection } from '@/components/hire-me-section';
import { AboutSection } from '@/components/about-section';
import { PricingSection } from '@/components/pricing-section';
import { BlogSection } from '@/components/blog-section';

export default function Home() {

  return (
    <div className="flex min-h-screen w-full bg-background flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div id="about" className="pt-20 -mt-20">
          <AboutSection />
        </div>
        <div id="services" className="pt-20 -mt-20">
          <ServicesSection />
        </div>
        <div id="work" className="pt-20 -mt-20">
          <ProjectsSection />
        </div>
        <div id="pricing" className="pt-20 -mt-20">
          <PricingSection />
        </div>
        <BlogSection />
        <div id="contact" className="pt-20 -mt-20">
          <HireMeSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
