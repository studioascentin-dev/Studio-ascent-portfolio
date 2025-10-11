
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, Code } from "lucide-react";

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

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeSection, setActiveSection] = React.useState('');
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const isHomePage = pathname === '/';
        const isAnchorLink = href.startsWith('/#');

        if (isAnchorLink) {
            e.preventDefault();
            const targetId = href.substring(2);

            if (isHomePage) {
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
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex h-20 w-full items-center justify-between"
                >
                    <Link href="/" className={cn("text-4xl font-bold font-headline")}>
                        <span className="text-primary">S</span>
                        <span className={cn("text-foreground")}>tudio</span>
                        {' '}
                        <span className="text-primary">A</span>
                        <span className={cn("text-foreground")}>scent</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center justify-end gap-8 md:gap-10">
                        {navItems.map((item) => (
                             <motion.div key={item.name} variants={itemVariants}>
                                <Link
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={cn(
                                        "text-base font-medium text-muted-foreground hover:text-primary transition-colors relative group",
                                        isLinkActive(item) && "text-primary font-semibold"
                                    )}
                                >
                                    {item.name}
                                    {isLinkActive(item) && (
                                        <motion.span 
                                            layoutId="active-dot-desktop"
                                            className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1.5 w-1.5 bg-primary rounded-full"
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <div className="md:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-md border-l-primary/20">
                               <SheetHeader>
                                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col h-full">
                                    <div className="mb-8 text-center">
                                         <Link href="/" onClick={() => setIsSheetOpen(false)} className="text-3xl font-bold font-headline">
                                            <span className="text-primary">S</span>
                                            <span className="text-foreground">tudio</span>
                                            {' '}
                                            <span className="text-primary">A</span>
                                            <span className="text-foreground">scent</span>
                                        </Link>
                                    </div>
                                    <nav className="flex flex-col items-center gap-8 text-xl">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => handleScroll(e, item.href)}
                                                className={cn(
                                                    "font-medium text-muted-foreground hover:text-primary transition-colors relative",
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
                                        <p>&copy; {new Date().getFullYear()} Dev Kumar Das</p>
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
