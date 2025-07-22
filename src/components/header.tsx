
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-center px-4 md:px-6">
        <nav className="flex gap-6 md:gap-10">
            <a href="#about-me" className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">Customers</a>
            <a href="#projects" className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}
