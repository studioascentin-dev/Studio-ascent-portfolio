
"use client";

import Link from "next/link";
import { Instagram, Youtube, Send } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/_.d_k_d/', icon: <Instagram className="h-5 w-5" /> },
  { name: 'Telegram', href: 'https://t.me/studioascent', icon: <Send className="h-5 w-5" /> },
  { name: 'YouTube', href: 'https://www.youtube.com/@D3Vedits', icon: <Youtube className="h-5 w-5" /> },
  { name: 'X', href: 'https://x.com/Dev69910032', icon: <XIcon className="h-5 w-5" /> },
];

const footerLinkGroups = [
  {
    title: "Quick Links",
    links: [
      { name: "About", href: "/#about" },
      { name: "Services", href: "/#services" },
      { name: "Store", href: "/store" },
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
    ]
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services/web-development"},
      { name: "Video Editing", href: "/services/video-editing"},
      { name: "AI Chatbots", href: "/services/ai-chatbot"},
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Refund Policy", href: "/refund-policy" },
    ]
  }
];


function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l95.7 132.3L389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary/20 backdrop-blur-sm border-t border-border py-12 text-foreground">
      <div className="mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">
          
          <div className="space-y-4 max-w-xs w-full">
            <h3 className="font-headline text-2xl font-bold text-primary">Studio Ascent</h3>
            <p className="text-muted-foreground text-sm">
              Creative full-stack developer and video editor, crafting beautiful digital experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-grow w-full md:flex justify-center md:justify-end">
              {/* Desktop View: Grid */}
              <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
                {footerLinkGroups.map(group => (
                    <div key={group.title}>
                        <h4 className="font-semibold font-headline mb-4">{group.title}</h4>
                        <ul className="space-y-3">
                            {group.links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}
              </div>

              {/* Mobile View: Accordion */}
              <div className="w-full md:hidden">
                <Accordion type="single" collapsible className="w-full">
                  {footerLinkGroups.map(group => (
                    <AccordionItem value={group.title} key={group.title} className="border-b border-border">
                      <AccordionTrigger className="py-4 font-semibold font-headline text-base hover:no-underline">{group.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3 pl-2">
                           {group.links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </li>
                            ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Studio Ascent. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
