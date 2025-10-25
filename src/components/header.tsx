
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

const Logo = () => {
    return (
        <div className="font-headline text-lg font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-300 to-primary animate-shimmer bg-[length:200%_auto]">
                Studio Ascent
            </span>
        </div>
    );
};


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

        const sections = ['about', 'services', 'contact', 'testimonials'];
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
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
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
                className="px-4 sm:px-8"
            >
                <div className="flex h-24 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
                        <Logo />
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-2 px-3 py-4 bg-background/50 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
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
                                            <Logo />
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
