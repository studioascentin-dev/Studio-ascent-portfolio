
"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Tag, Mail, Users, Home } from 'lucide-react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const navItems = [
  { href: '#hero', text: 'About', icon: Home, refKey: 'aboutRef' },
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

const NavLink = ({ item, activeSection, isMobile }: { item: typeof navItems[0], activeSection: string, isMobile: boolean }) => {
    const isActive = activeSection === item.refKey;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = item.href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        // The 'hero' section corresponds to the top of the page, so we use a different ID.
        const scrollTarget = targetId === 'hero' ? document.getElementById('hero-section') : targetElement;
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const LinkContent = () => (
        <a 
            href={item.href}
            onClick={handleClick}
            className={cn(
                "relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300",
                isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
        >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.text}</span>
        </a>
    );

    if (isMobile) {
        return <LinkContent />;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="relative">
                    <LinkContent />
                     {isActive && (
                        <motion.div
                            className="absolute inset-0 z-0 rounded-full bg-primary"
                            layoutId="active-nav-item"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>{item.text}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export function Header({ refs }: HeaderProps) {
    const [activeSection, setActiveSection] = React.useState('aboutRef');
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50% 0px -50% 0px'
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
        <header className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-4">
            <TooltipProvider>
                <nav className="rounded-full border bg-background/50 p-2 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-center gap-2">
                        {navItems.map((item) => (
                            <NavLink key={item.text} item={item} activeSection={activeSection} isMobile={isMobile} />
                        ))}
                    </div>
                </nav>
            </TooltipProvider>
        </header>
    );
}
