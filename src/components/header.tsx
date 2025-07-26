
"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Home, Video, Camera, Presentation, Code, PenTool, FolderKanban, MessageCircle } from 'lucide-react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '#hero-section', text: 'About', icon: Home, refKey: 'aboutRef' },
  { href: '#projects', text: 'Projects', icon: FolderKanban, refKey: 'projectsRef' },
  { href: '#video-editing', text: 'Video Editing', icon: Video, refKey: 'videoEditingRef' },
  { href: '#photo-editing', text: 'Photo Editing', icon: Camera, refKey: 'photoEditingRef' },
  { href: '#ppt-design', text: 'PPT Design', icon: Presentation, refKey: 'pptDesignRef' },
  { href: '#web-design', text: 'Web Design', icon: PenTool, refKey: 'webDesignRef' },
  { href: '#web-development', text: 'Web Development', icon: Code, refKey: 'webDevelopmentRef' },
  { href: '#hire-me', text: 'Hire Me', icon: MessageCircle, refKey: 'hireMeRef' },
];

interface HeaderProps {
    refs?: {
        aboutRef?: React.RefObject<HTMLElement>;
        projectsRef?: React.RefObject<HTMLElement>;
        videoEditingRef?: React.RefObject<HTMLElement>;
        photoEditingRef?: React.RefObject<HTMLElement>;
        pptDesignRef?: React.RefObject<HTMLElement>;
        webDesignRef?: React.RefObject<HTMLElement>;
        webDevelopmentRef?: React.RefObject<HTMLElement>;
        hireMeRef?: React.RefObject<HTMLElement>;
    }
}

const NavLink = ({ item, activeSection }: { item: typeof navItems[0], activeSection: string }) => {
    const isActive = activeSection === item.refKey;
    const isMobile = useIsMobile();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = item.href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <motion.div
                    whileHover={!isMobile ? { scale: 1.4, y: -8 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="relative"
                >
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
                     {isActive && (
                        <motion.div
                            className="absolute inset-0 z-0 rounded-full bg-primary"
                            layoutId="active-nav-item"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>{item.text}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export function Header({ refs = {} }: HeaderProps) {
    const [activeSection, setActiveSection] = React.useState('aboutRef');

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50% 0px -50% 0px'
    };
  
    const isAboutOnScreen = useOnScreen(refs.aboutRef, observerOptions);
    const isProjectsOnScreen = useOnScreen(refs.projectsRef, observerOptions);
    const isVideoEditingOnScreen = useOnScreen(refs.videoEditingRef, observerOptions);
    const isPhotoEditingOnScreen = useOnScreen(refs.photoEditingRef, observerOptions);
    const isPptDesignOnScreen = useOnScreen(refs.pptDesignRef, observerOptions);
    const isWebDesignOnScreen = useOnScreen(refs.webDesignRef, observerOptions);
    const isWebDevelopmentOnScreen = useOnScreen(refs.webDevelopmentRef, observerOptions);
    const isHireMeOnScreen = useOnScreen(refs.hireMeRef, observerOptions);
    
    React.useEffect(() => {
        let currentSection = 'aboutRef';
        if (isHireMeOnScreen) currentSection = 'hireMeRef';
        if (isWebDevelopmentOnScreen) currentSection = 'webDevelopmentRef';
        if (isWebDesignOnScreen) currentSection = 'webDesignRef';
        if (isPptDesignOnScreen) currentSection = 'pptDesignRef';
        if (isPhotoEditingOnScreen) currentSection = 'photoEditingRef';
        if (isVideoEditingOnScreen) currentSection = 'videoEditingRef';
        if (isProjectsOnScreen) currentSection = 'projectsRef';
        if (isAboutOnScreen) currentSection = 'aboutRef';
        setActiveSection(currentSection);
    }, [isAboutOnScreen, isProjectsOnScreen, isVideoEditingOnScreen, isPhotoEditingOnScreen, isPptDesignOnScreen, isWebDesignOnScreen, isWebDevelopmentOnScreen, isHireMeOnScreen]);

    return (
        <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-full max-w-[95vw] md:max-w-none md:w-auto">
            <TooltipProvider>
                <nav className="rounded-full border bg-background/50 p-1 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-start md:justify-center gap-1 md:gap-1 overflow-x-auto scrollbar-hide">
                        {navItems.map((item) => (
                            <NavLink key={item.text} item={item} activeSection={activeSection} />
                        ))}
                    </div>
                </nav>
            </TooltipProvider>
        </header>
    );
}
