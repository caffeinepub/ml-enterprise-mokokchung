import { Package, Truck, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    icon: Package,
    title: 'Courier & Delivery',
    description: 'Fast and secure door-to-door delivery services for all your parcel needs.',
    features: [
      'Same-day delivery available',
      'Real-time tracking support',
      'Secure handling of packages',
      'Proof of delivery'
    ]
  },
  {
    icon: Truck,
    title: 'Logistics & Transport',
    description: 'Comprehensive logistics solutions for businesses of all sizes.',
    features: [
      'Pickup available anywhere in India',
      'Bulk shipment handling',
      'Scheduled pickups',
      'Route optimization',
      'Flexible delivery windows'
    ]
  },
  {
    icon: Clock,
    title: 'Express Parcel Service',
    description: 'Time-sensitive deliveries with guaranteed arrival times.',
    features: [
      'Priority handling',
      'Express delivery options',
      'Weekend delivery available',
      'Emergency courier service'
    ]
  },
  {
    icon: MapPin,
    title: 'Business Shipping Solutions',
    description: 'Tailored shipping solutions designed for business requirements.',
    features: [
      'Corporate accounts',
      'Volume discounts',
      'Dedicated support',
      'Custom delivery schedules'
    ]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">Our Services</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Comprehensive Logistics Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From small parcels to large shipments, we provide reliable delivery services tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-2 hover:border-accent/50 transition-colors hover:shadow-soft">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-display mt-4">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
