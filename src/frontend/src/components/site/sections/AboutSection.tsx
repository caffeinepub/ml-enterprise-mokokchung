import { Shield, Users, Award, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const values = [
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Your packages are safe with us. We ensure secure handling and timely delivery every time.'
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'We prioritize your needs with personalized service and dedicated support for every delivery.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to maintaining the highest standards in logistics and courier services.'
  },
  {
    icon: Heart,
    title: 'Local Focus',
    description: 'Proudly serving Mokokchung and surrounding areas with deep community roots.'
  }
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <Badge variant="outline" className="text-accent border-accent">About Us</Badge>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
              Delivering Trust Since Day One
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                ML Enterprise is Mokokchung's premier logistics and courier service provider. We understand the importance of reliable delivery services for both individuals and businesses in our community.
              </p>
              <p>
                Our team of experienced professionals is dedicated to ensuring your packages reach their destination safely and on time. Whether it's a small parcel or a large shipment, we handle every delivery with the same level of care and attention.
              </p>
              <p>
                With deep roots in the local community, we pride ourselves on understanding the unique logistics challenges of the region and providing solutions that work for our customers.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg border-2 bg-card hover:border-accent/50 transition-colors"
                >
                  <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
