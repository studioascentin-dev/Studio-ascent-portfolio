
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import * as React from 'react';

const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Blog", href: "/blog" },
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
    const [activeSection, setActiveSection] = React.useState('services');

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            setActiveSection(targetId);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    // A simple check for active link, can be improved with IntersectionObserver
    const isLinkActive = (item: {name: string, href: string}) => {
        if (item.href.startsWith("#")) {
            return activeSection === item.href.substring(1);
        }
        return pathname === item.href;
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-8">
            <motion.div
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-end"
            >
                <nav className="flex items-center justify-end gap-6 md:gap-8">
                    {navItems.map((item) => (
                         <motion.div key={item.name} variants={itemVariants}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className={cn(
                                    "text-lg font-medium text-muted-foreground hover:text-primary transition-colors relative group",
                                    isLinkActive(item) && "text-foreground font-semibold"
                                )}
                            >
                                {item.name}
                                {isLinkActive(item) && (
                                    <motion.span 
                                        layoutId="active-dot"
                                        className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-1.5 w-1.5 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        </header>
    );
}
