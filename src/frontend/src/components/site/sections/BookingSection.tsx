import { useState } from 'react';
import { Package, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSubmitBooking } from '@/hooks/useSubmitBooking';
import { validateBookingForm } from '@/lib/validation/booking';
import { useOneShotTimeout } from '@/hooks/useOneShotTimeout';

export function BookingSection() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    pickupLocation: '',
    dropOffLocation: '',
    packageDetails: '',
    preferredPickupTime: '',
    notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: submitBooking, isPending, isSuccess, isError, reset: resetMutation } = useSubmitBooking();

  // Use one-shot timeout to reset form after successful submission
  useOneShotTimeout(
    () => {
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        pickupLocation: '',
        dropOffLocation: '',
        packageDetails: '',
        preferredPickupTime: '',
        notes: ''
      });
      setErrors({});
      resetMutation();
    },
    2000,
    isSuccess
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing (remove the key entirely)
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    submitBooking({
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      pickupLocation: formData.pickupLocation,
      dropOffLocation: formData.dropOffLocation,
      packageDetails: formData.packageDetails,
      preferredPickupTime: formData.preferredPickupTime,
      notes: formData.notes.trim() || null,
      created: BigInt(Date.now())
    });
  };

  const validation = validateBookingForm(formData);
  const isFormValid = validation.isValid;

  return (
    <section id="booking" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">Book Your Delivery</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Schedule a Pickup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below to book your delivery. We'll confirm your booking and arrange pickup at your convenience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Information */}
          <div className="space-y-6">
            <Card className="border-2 bg-background">
              <CardHeader>
                <CardTitle className="font-display">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Package className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">1. Submit Your Booking</h4>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form with your package and delivery details
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">2. We'll Confirm</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will contact you to confirm pickup time and details
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg mt-1">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">3. We Pick Up & Deliver</h4>
                    <p className="text-sm text-muted-foreground">
                      We'll collect your package and ensure safe, timely delivery
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-accent/5">
              <CardHeader>
                <CardTitle className="font-display">What We Need</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Complete pickup and drop-off addresses
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Package details (size, weight, contents)
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Your preferred pickup date and time
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <p className="text-sm text-muted-foreground">
                    Contact information for coordination
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <Card className="border-2 bg-background">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <img 
                  src="/assets/59510ff589da7ac4adcfc8661de0963a.jpg" 
                  alt="ML Enterprise logo" 
                  className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={errors.customerName ? 'border-destructive' : ''}
                  />
                  {errors.customerName && (
                    <p className="text-sm text-destructive">{errors.customerName}</p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupLocation">Pickup Location *</Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="Enter pickup address"
                    className={errors.pickupLocation ? 'border-destructive' : ''}
                  />
                  {errors.pickupLocation && (
                    <p className="text-sm text-destructive">{errors.pickupLocation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropOffLocation">Drop-off Location *</Label>
                  <Input
                    id="dropOffLocation"
                    name="dropOffLocation"
                    value={formData.dropOffLocation}
                    onChange={handleChange}
                    placeholder="Enter delivery address"
                    className={errors.dropOffLocation ? 'border-destructive' : ''}
                  />
                  {errors.dropOffLocation && (
                    <p className="text-sm text-destructive">{errors.dropOffLocation}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packageDetails">Package Details *</Label>
                  <Textarea
                    id="packageDetails"
                    name="packageDetails"
                    value={formData.packageDetails}
                    onChange={handleChange}
                    placeholder="Describe your package (size, weight, contents, special handling)"
                    rows={3}
                    className={errors.packageDetails ? 'border-destructive' : ''}
                  />
                  {errors.packageDetails && (
                    <p className="text-sm text-destructive">{errors.packageDetails}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredPickupTime">Preferred Pickup Date & Time *</Label>
                  <Input
                    id="preferredPickupTime"
                    name="preferredPickupTime"
                    value={formData.preferredPickupTime}
                    onChange={handleChange}
                    placeholder="e.g., Tomorrow 10 AM, Jan 15 2:00 PM"
                    className={errors.preferredPickupTime ? 'border-destructive' : ''}
                  />
                  {errors.preferredPickupTime && (
                    <p className="text-sm text-destructive">{errors.preferredPickupTime}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions or requirements..."
                    rows={3}
                  />
                </div>

                {isSuccess && (
                  <Alert className="bg-accent/10 border-accent">
                    <AlertDescription className="text-accent-foreground">
                      Thank you! Your booking has been submitted successfully. We'll contact you shortly to confirm.
                    </AlertDescription>
                  </Alert>
                )}

                {isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Failed to submit booking. Please try again or contact us directly.
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isPending || !isFormValid}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Booking...
                    </>
                  ) : (
                    'Submit Booking'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
