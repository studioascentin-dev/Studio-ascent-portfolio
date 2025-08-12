

"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import * as React from 'react';
import { HireMeSection } from '@/components/hire-me-section';
import { AboutSection } from '@/components/about-section';

export default function Home() {

  return (
    <div className="flex min-h-screen w-full bg-background flex-col">
      <Header />
      <main className="flex-1">
        <div id="home">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="work">
          <ProjectsSection />
        </div>
        <div id="contact">
          <HireMeSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
