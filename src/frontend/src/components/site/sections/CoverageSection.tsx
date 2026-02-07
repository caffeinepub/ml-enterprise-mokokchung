import { MapPin, Clock, CheckCircle, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const coverageAreas = [
  'Mokokchung Town',
  'Ungma Village',
  'Chuchuyimlang',
  'Longkhum',
  'Mopungchuket',
  'Mangkolemba',
  'Tuli',
  'Changtongya'
];

const deliveryInfo = [
  {
    icon: Clock,
    title: 'Delivery Windows',
    items: [
      'Standard: 1-2 business days',
      'Express: Same day delivery',
      'Scheduled: Choose your time slot'
    ]
  },
  {
    icon: MapPin,
    title: 'Service Areas',
    items: [
      'Mokokchung district coverage',
      'Neighboring district connections',
      'Special route requests available'
    ]
  }
];

export function CoverageSection() {
  return (
    <section id="coverage" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">Coverage Area</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Serving Mokokchung & Beyond
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer nationwide pickup service across India with comprehensive coverage in Mokokchung district and flexible delivery options to meet your needs.
          </p>
        </div>

        {/* Nationwide Pickup Banner */}
        <Card className="border-2 border-accent/30 bg-accent/5 mb-8">
          <CardContent className="py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <div className="text-center">
                <h3 className="font-display font-bold text-xl text-accent mb-1">
                  Nationwide Pickup Available
                </h3>
                <p className="text-muted-foreground">
                  We offer pickup service anywhere in India — contact us to schedule your pickup today
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {deliveryInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-xl font-display">{info.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {info.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coverage Areas */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-display">Primary Coverage Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {coverageAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-secondary/50"
                >
                  <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Don't see your location? Contact us to inquire about special delivery arrangements and route extensions.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
