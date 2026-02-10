import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubmitInquiry } from '@/hooks/useSubmitInquiry';
import { useSubmitWhatsAppQuery } from '@/hooks/useSubmitWhatsAppQuery';
import { validateContactForm } from '@/lib/validation/contactInquiry';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/utils/whatsapp';

const BUSINESS_PHONE = '9366012115';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Location',
    content: 'Tongdentsuyong Ward, A.M Road, Mokokchung, Nagaland 798601'
  },
  {
    icon: Phone,
    title: 'Phone',
    content: BUSINESS_PHONE
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'mlenterprisemkg@gmail.com'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon-Sat: 9:00 AM - 6:00 PM'
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatsappError, setWhatsappError] = useState<string>('');

  const { mutate: submitInquiry, isPending, isSuccess, isError } = useSubmitInquiry();
  const { mutate: submitWhatsAppQuery, isPending: isWhatsAppPending } = useSubmitWhatsAppQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (whatsappError) {
      setWhatsappError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    submitInquiry({
      name: formData.name,
      email: formData.email,
      message: `Phone: ${formData.phone}\n\n${formData.message}`,
      timestamp: BigInt(Date.now())
    });
  };

  const handleWhatsAppClick = () => {
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setWhatsappError('');

    // Build pre-filled WhatsApp message
    const message = buildWhatsAppMessage({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    // Submit WhatsApp query to backend
    submitWhatsAppQuery(
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        timestamp: BigInt(Date.now())
      },
      {
        onSuccess: () => {
          // Open WhatsApp only after successful submission
          const whatsappUrl = buildWhatsAppUrl(BUSINESS_PHONE, message);
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        },
        onError: (error) => {
          console.error('WhatsApp query submission error:', error);
          setWhatsappError('Failed to submit WhatsApp query. Please try again or contact us directly.');
        }
      }
    );
  };

  // Reset form after successful submission
  if (isSuccess && formData.name) {
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 2000);
  }

  const isFormValid = validateContactForm(formData).isValid;

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">Get In Touch</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Contact Us Today
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question or need a quote? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-2xl mb-6">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <Icon className="h-4 w-4 text-accent" />
                          </div>
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {info.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium break-words">{info.content}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="border-2 bg-accent/5">
              <CardHeader>
                <CardTitle className="font-display">Why Choose ML Enterprise?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Local expertise with deep understanding of the region
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Reliable and timely delivery services
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Competitive pricing with no hidden fees
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Dedicated customer support team
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your delivery needs..."
                    rows={5}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                {isSuccess && (
                  <Alert className="bg-accent/10 border-accent">
                    <AlertDescription className="text-accent-foreground">
                      Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to submit inquiry. Please try again or contact us directly.
                    </AlertDescription>
                  </Alert>
                )}

                {whatsappError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {whatsappError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                    onClick={handleWhatsAppClick}
                    disabled={!isFormValid || isWhatsAppPending}
                  >
                    {isWhatsAppPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <SiWhatsapp className="mr-2 h-4 w-4" />
                        WhatsApp Us
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
