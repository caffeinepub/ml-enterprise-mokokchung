import { Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              <Truck className="h-4 w-4" />
              <span>Fast & Reliable Delivery</span>
            </div>
            
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Your Trusted Logistics Partner in{' '}
              <span className="text-accent">Mokokchung</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              ML Enterprise delivers excellence in courier and logistics services with pickup available anywhere in India. From local deliveries to business shipping solutions, we ensure your packages reach their destination safely and on time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-base"
              >
                <Package className="mr-2 h-5 w-5" />
                Request a Pickup
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="text-base"
              >
                Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="font-display font-bold text-3xl text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Deliveries/Month</div>
              </div>
              <div>
                <div className="font-display font-bold text-3xl text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div>
                <div className="font-display font-bold text-3xl text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:h-[600px] h-[400px] animate-fade-in">
            <img
              src="/assets/generated/ml-hero-banner.dim_1600x600.png"
              alt="ML Enterprise Logistics Services"
              className="w-full h-full object-cover rounded-lg shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
