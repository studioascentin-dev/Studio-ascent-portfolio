
"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Tag, Mail, Briefcase } from 'lucide-react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#hero', text: 'About', icon: User, refKey: 'aboutRef' },
  { href: '#services', text: 'Services', icon: Users, refKey: 'servicesRef' },
  { href: '#pricing', text: 'Pricing', icon: Tag, refKey: 'pricingRef' },
  { href: '#hire-me', text: 'Hire Me', icon: Briefcase, refKey: 'hireMeRef' },
  { href: '#contact', text: 'Contact', icon: Mail, refKey: 'contactRef' },
];

interface HeaderProps {
    refs: {
        aboutRef: React.RefObject<HTMLElement>;
        servicesRef: React.RefObject<HTMLElement>;
        pricingRef: React.RefObject<HTMLElement>;
        hireMeRef: React.RefObject<HTMLElement>;
        contactRef: React.RefObject<HTMLElement>;
    }
}

const NavLink = ({ item, activeSection }: { item: typeof navItems[0], activeSection: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isActive = activeSection === item.refKey;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = item.href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a 
            href={item.href}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "relative text-sm font-medium uppercase tracking-widest transition-colors",
                isActive ? "text-primary" : "hover:text-primary"
            )}
        >
            <span className="md:hidden">
                <item.icon className="h-6 w-6" />
            </span>
            <span className="hidden md:block">{item.text}</span>
            {isHovered && (
                <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
            {isActive && (
                 <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="underline"
                />
            )}
        </a>
    )
}

export function Header({ refs }: HeaderProps) {
  const [activeSection, setActiveSection] = React.useState('aboutRef');

  const observerOptions = {
    threshold: 0.3,
  };

  const isAboutOnScreen = useOnScreen(refs.aboutRef, observerOptions);
  const isServicesOnScreen = useOnScreen(refs.servicesRef, observerOptions);
  const isPricingOnScreen = useOnScreen(refs.pricingRef, observerOptions);
  const isHireMeOnScreen = useOnScreen(refs.hireMeRef, observerOptions);
  const isContactOnScreen = useOnScreen(refs.contactRef, observerOptions);
  
  React.useEffect(() => {
    if (isAboutOnScreen) setActiveSection('aboutRef');
    if (isServicesOnScreen) setActiveSection('servicesRef');
    if (isPricingOnScreen) setActiveSection('pricingRef');
    if (isHireMeOnScreen) setActiveSection('hireMeRef');
    if (isContactOnScreen) setActiveSection('contactRef');
  }, [isAboutOnScreen, isServicesOnScreen, isPricingOnScreen, isHireMeOnScreen, isContactOnScreen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-center px-4 md:px-6">
        <nav className="flex gap-6 md:gap-10">
          {navItems.map((item) => (
            <NavLink key={item.text} item={item} activeSection={activeSection} />
          ))}
        </nav>
      </div>
    </header>
  );
}
