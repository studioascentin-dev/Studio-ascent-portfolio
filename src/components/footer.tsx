
"use client";

import Link from "next/link";
import { Instagram, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/_.d_k_d/', icon: <Instagram className="h-5 w-5" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/deb-kumar-das-46193824a', icon: <Linkedin className="h-5 w-5" /> },
  { name: 'YouTube', href: 'https://www.youtube.com/@D3Vedits', icon: <Youtube className="h-5 w-5" /> },
  { name: 'X', href: 'https://x.com/Dev69910032', icon: <XIcon className="h-5 w-5" /> },
];

const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Store", href: "/store" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/#contact" },
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
    <footer className="bg-secondary/20 backdrop-blur-sm border-t border-white/5 pt-16 md:pt-24 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
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

          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold font-headline mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold font-headline mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/services/web-development" className="text-sm text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
                <li><Link href="/services/video-editing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Video Editing</Link></li>
                <li><Link href="/services/photo-editing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Photo Editing</Link></li>
                <li><Link href="/services/ai-chatbot" className="text-sm text-muted-foreground hover:text-primary transition-colors">AI Chatbots</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold font-headline mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:dkd04522@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    dkd04522@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Studio Ascent. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
