import { MountainIcon } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <a className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-headline tracking-wider">Studio Ascent</span>
        </a>
        <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
        </nav>
      </div>
    </header>
  );
}
