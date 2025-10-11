
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const navItems = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Store", href: "/store" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/#contact" },
];

const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#F06', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#8338EC', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-gradient)"/>
        <path d="M2 17L12 22L22 17L12 12L2 17Z" fill="url(#logo-gradient)" opacity="0.6"/>
        <path d="M2 12L12 17L22 12L12 7L2 12Z" fill="url(#logo-gradient)" opacity="0.3"/>
    </svg>
);


export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeSection, setActiveSection] = React.useState('');
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const isAnchorLink = href.startsWith('/#');

        if (isAnchorLink) {
            e.preventDefault();
            const targetId = href.substring(2);

            if (pathname === '/') {
                setActiveSection(targetId);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                router.push(`/#${targetId}`);
            }
             setIsSheetOpen(false);
        } else {
            router.push(href);
            setIsSheetOpen(false);
        }
    };
    
    React.useEffect(() => {
        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        const sections = ['about', 'services', 'contact'];
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }

        const checkScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', checkScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', checkScroll);
        };
    }, [pathname]);

    const isLinkActive = (item: {name: string, href: string}) => {
        if (item.href.startsWith("/#")) {
            if (pathname === '/') {
                return activeSection === item.href.substring(2);
            }
            return false;
        }
        return pathname.startsWith(item.href);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="flex h-24 items-center justify-between"
                >
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                        <LogoIcon />
                        <span className="font-bold text-foreground">Studio Ascent</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-2 px-3 py-2 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                        {navItems.map((item) => (
                             <motion.div key={item.name} variants={itemVariants}>
                                <Link
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-full",
                                        isLinkActive(item) && "text-primary"
                                    )}
                                >
                                    {item.name}
                                    {isLinkActive(item) && (
                                        <motion.span 
                                            layoutId="active-nav-highlight"
                                            className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="md:hidden">
                         <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="bg-background/50 backdrop-blur-lg border border-white/10">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs bg-background/90 backdrop-blur-xl border-l-primary/20">
                               <SheetHeader>
                                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col h-full pt-10">
                                    <div className="mb-10 text-center">
                                         <Link href="/" onClick={() => setIsSheetOpen(false)} className="inline-flex items-center gap-3">
                                            <LogoIcon />
                                            <span className="text-xl font-bold font-headline text-foreground">Studio Ascent</span>
                                        </Link>
                                    </div>
                                    <nav className="flex flex-col items-center gap-6 text-lg">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => handleScroll(e, item.href)}
                                                className={cn(
                                                    "font-medium text-muted-foreground hover:text-primary transition-colors py-2 relative",
                                                    isLinkActive(item) && "text-primary font-semibold"
                                                )}
                                            >
                                                {item.name}
                                                {isLinkActive(item) && (
                                                    <motion.span 
                                                        layoutId="active-dot-mobile"
                                                        className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full"
                                                    />
                                                )}
                                            </Link>
                                        ))}
                                    </nav>
                                    <div className="mt-auto text-center text-muted-foreground text-sm">
                                        <p>&copy; {new Date().getFullYear()} Studio Ascent</p>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
