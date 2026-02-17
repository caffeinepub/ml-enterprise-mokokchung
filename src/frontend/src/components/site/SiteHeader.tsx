import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Tracking', href: '#tracking' },
  { label: 'Label Print', href: '#label-print' },
  { label: 'Booking', href: '#booking' },
  { label: 'Contact', href: '#contact' }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight">ML Enterprise</span>
              <span className="text-xs text-muted-foreground">Mokokchung</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium"
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={() => scrollToSection('#booking')}
              className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Book Now
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-lg font-medium hover:text-accent transition-colors py-2"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollToSection('#booking')}
                  className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Book Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
