
"use client";

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ServicesSection } from '@/components/services-section';
import { Footer } from '@/components/footer';
import * as React from 'react';

export default function Home() {
  const aboutRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);

  const videoEditingRef = React.useRef<HTMLDivElement>(null);
  const photoEditingRef = React.useRef<HTMLDivElement>(null);
  const pptDesignRef = React.useRef<HTMLDivElement>(null);
  const webDesignRef = React.useRef<HTMLDivElement>(null);
  const webDevelopmentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header refs={{ aboutRef, projectsRef, videoEditingRef, photoEditingRef, pptDesignRef, webDesignRef, webDevelopmentRef }} />
      <main className="flex-1">
        <div id="hero-section" ref={aboutRef}>
            <HeroSection />
        </div>
        <div id="projects" ref={projectsRef}>
            <ProjectsSection />
        </div>
        <ServicesSection refs={{ videoEditingRef, photoEditingRef, pptDesignRef, webDesignRef, webDevelopmentRef }} />
      </main>
      <Footer />
    </div>
  );
}
