
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Home, User, Briefcase, Star, Mail, Menu, X, Github, Linkedin, Twitter } from 'lucide-react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navItems = [
    { href: '#home', text: 'Home', icon: Home, refKey: 'heroRef' },
    { href: '#about', text: 'About', icon: User, refKey: 'aboutRef' },
    { href: '#services', text: 'Services', icon: Briefcase, refKey: 'servicesRef' },
    { href: '#projects', text: 'Projects', icon: Star, refKey: 'projectsRef' },
    { href: '#contact', text: 'Contact', icon: Mail, refKey: 'contactRef' },
];

const socialLinks = [
    { href: 'https://github.com', icon: Github },
    { href: 'https://linkedin.com', icon: Linkedin },
    { href: 'https://twitter.com', icon: Twitter },
];

interface SidebarProps {
    sections: {
        heroRef: React.RefObject<HTMLElement>;
        aboutRef: React.RefObject<HTMLElement>;
        servicesRef: React.RefObject<HTMLElement>;
        projectsRef: React.RefObject<HTMLElement>;
        contactRef: React.RefObject<HTMLElement>;
    }
}

const NavLink = ({ item, activeSection, onClick }: { item: typeof navItems[0], activeSection: string, onClick: () => void }) => {
    const isActive = activeSection === item.refKey;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = item.href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        onClick();
    };
    
    return (
        <a 
            href={item.href}
            onClick={handleClick}
            className={cn(
                "flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 w-full text-lg",
                isActive ? "bg-primary text-primary-foreground font-bold shadow-lg" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
        >
            <item.icon className="h-6 w-6" />
            <span>{item.text}</span>
        </a>
    )
}

export function Sidebar({ sections }: SidebarProps) {
    const [activeSection, setActiveSection] = useState('heroRef');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const sectionStates = {
        heroRef: useOnScreen(sections.heroRef, observerOptions),
        aboutRef: useOnScreen(sections.aboutRef, observerOptions),
        servicesRef: useOnScreen(sections.servicesRef, observerOptions),
        projectsRef: useOnScreen(sections.projectsRef, observerOptions),
        contactRef: useOnScreen(sections.contactRef, observerOptions),
    };

    useEffect(() => {
        const currentSection = Object.entries(sectionStates).find(([, isOnScreen]) => isOnScreen)?.[0] || activeSection;
        setActiveSection(currentSection);
    }, [sectionStates, activeSection]);

    const sidebarContent = (
         <div className="flex flex-col h-full p-8 bg-secondary/50">
            <div className="text-center mb-12">
                <Image 
                    src="https://placehold.co/150x150.png"
                    alt="Dev Kumar Das"
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4 border-4 border-primary"
                    data-ai-hint="developer portrait"
                />
                <h2 className="text-2xl font-bold font-headline text-foreground">Dev Kumar Das</h2>
            </div>
            <nav className="flex-grow">
                <ul className="space-y-4">
                    {navItems.map(item => (
                        <li key={item.text}>
                            <NavLink item={item} activeSection={activeSection} onClick={() => setIsMobileMenuOpen(false)} />
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="text-center">
                <div className="flex justify-center gap-4 mb-4">
                    {socialLinks.map(link => (
                        <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <link.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Dev Kumar Das</p>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                size="icon"
                variant="ghost"
                className="md:hidden fixed top-4 right-4 z-[60]"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle Menu</span>
            </Button>
            
            {/* Mobile Sidebar */}
            <div className={cn(
                "md:hidden fixed inset-0 z-50 bg-secondary transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                {sidebarContent}
            </div>
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:block fixed top-0 left-0 h-full w-[300px] z-40">
                {sidebarContent}
            </aside>
        </>
    );
}
