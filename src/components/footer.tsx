
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
    <footer className="py-12 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center mb-8">
            <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold font-headline">Location</h3>
                <p className="text-muted-foreground">Sonapur, India</p>
            </div>
            <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold font-headline">Email</h3>
                <a href="mailto:devkumardas2003@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    devkumardas2003@gmail.com
                </a>
            </div>
            <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-lg font-bold font-headline">WhatsApp</h3>
                  <a href="#" onClick={handleWhatsAppClick} className="text-muted-foreground hover:text-primary transition-colors">
                    +91 9707191619
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
}
