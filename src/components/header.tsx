
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

const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g filter="url(#filter0_f_1_10)">
            <path d="M22.0446 22.8443L20.806 26.541H11.2387L17.2144 7.64321H24.385L30.3607 26.541H20.7934L20.0827 24.2882H26.973L27.6837 22.0354L22.0446 22.8443Z" fill="#FF9E6C"/>
            <path d="M53.111 26.541H38.5833V7.64321H53.111V11.5303H43.8324V15.0118H52.5401V18.8988H43.8324V22.6539H53.111V26.541Z" fill="#FF9E6C"/>
        </g>
        <path d="M25.5291 19.3486L22.8291 10.9996L20.1291 19.3486H25.5291Z" stroke="#492424" strokeWidth="1.5"/>
        <path d="M20.806 26.541L17.2144 7.64321H24.385L27.9766 26.541M20.806 26.541H11.2387M20.806 26.541L22.0446 22.8443M27.9766 26.541H20.7934L20.0827 24.2882H26.973L27.6837 22.0354M22.0446 22.8443L25.5291 19.3486M22.0446 22.8443L20.1291 19.3486M27.6837 22.0354L25.5291 19.3486M27.6837 22.0354L30.3607 26.541" stroke="#492424" strokeWidth="1.5"/>
        <path d="M38.5833 7.64321V26.541H53.111V22.6539H43.8324V18.8988H52.5401V15.0118H43.8324V11.5303H53.111V7.64321H38.5833Z" stroke="#492424" strokeWidth="1.5"/>
        <rect x="58" y="28" width="85" height="10" rx="5" fill="#FF9E6C"/>
        <text fill="#492424" xmlSpace="preserve" style={{whiteSpace: "pre"}} fontFamily="Montserrat" fontSize="8" fontWeight="bold" letterSpacing="0.05em">
            <tspan x="62" y="36.5">STUDIO ASCENT</tspan>
        </text>
        <defs>
            <filter id="filter0_f_1_10" x="7.23865" y="3.64321" width="49.8724" height="26.8978" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_1_10"/>
            </filter>
        </defs>
    </svg>
);


export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeSection, setActiveSection] = React.useState('');
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);

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


        return () => {
            observer.disconnect();
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
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="container mx-auto px-4 md:px-6"
            >
                <div className="flex h-24 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                        <LogoIcon className="h-10 w-auto"/>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-2 px-3 py-2 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                        {navItems.map((item) => (
                             <motion.div key={item.name}>
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
                                            <LogoIcon className="h-12 w-auto" />
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
                </div>
            </motion.div>
        </header>
    );
}

    