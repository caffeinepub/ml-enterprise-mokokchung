import { Heart } from 'lucide-react';

export function SiteFooter() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-secondary/30">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/assets/generated/ml-enterprise-logo.dim_512x512.png"
                alt="ML Enterprise Logo"
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight">ML Enterprise</span>
                <span className="text-xs text-muted-foreground">Mokokchung</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted logistics and courier service partner in Mokokchung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'About', 'Coverage', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(`#${link.toLowerCase()}`)}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Courier & Delivery</li>
              <li>Logistics & Transport</li>
              <li>Express Parcel Service</li>
              <li>Business Shipping</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="break-words">Tongdentsuyong Ward, A.M Road, Mokokchung, Nagaland 798601</li>
              <li className="break-words">9366012115</li>
              <li className="break-words">mlenterprisemkg@gmail.com</li>
              <li>Mon-Sat: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2026 ML Enterprise. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 text-accent fill-accent" /> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 hover:text-accent transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
