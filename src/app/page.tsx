
"use client";

import { Sidebar } from '@/components/sidebar';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import * as React from 'react';
import { HireMeSection } from '@/components/hire-me-section';
import { AboutSection } from '@/components/about-section';

export default function Home() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);

  const sections = {
    heroRef,
    aboutRef,
    servicesRef,
    projectsRef,
    contactRef,
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar sections={sections} />
      <main className="flex-1 md:pl-[300px]">
        <div id="home" ref={heroRef}>
          <HeroSection />
        </div>
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>
        <div id="services" ref={servicesRef}>
          <ServicesSection />
        </div>
        <div id="projects" ref={projectsRef}>
          <ProjectsSection />
        </div>
        <div id="contact" ref={contactRef}>
          <HireMeSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
