
"use client";

import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {

  const phoneNumber = "919707191619";

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const message = "Hello! I saw your portfolio and I'm interested in your services. Let's discuss a project.";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <footer className="py-8 bg-transparent">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Studio Ascent. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
