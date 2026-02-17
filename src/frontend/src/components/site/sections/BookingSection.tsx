import { useState } from 'react';
import { Package, MapPin, Calendar, Loader2, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSubmitBooking } from '@/hooks/useSubmitBooking';
import { validateBookingForm } from '@/lib/validation/booking';
import { useOneShotTimeout } from '@/hooks/useOneShotTimeout';

export function BookingSection() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    receiverAddress: '',
    pickupLocation: '',
    dropOffLocation: '',
    packageDetails: '',
    preferredPickupTime: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: submitBooking, isPending, isSuccess, isError, reset: resetMutation } = useSubmitBooking();

  // Use one-shot timeout to reset form after successful submission
  useOneShotTimeout(
    () => {
      setFormData({
        senderName: '',
        senderPhone: '',
        senderEmail: '',
        senderAddress: '',
        receiverName: '',
        receiverPhone: '',
        receiverEmail: '',
        receiverAddress: '',
        pickupLocation: '',
        dropOffLocation: '',
        packageDetails: '',
        preferredPickupTime: ''
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
      sender: {
        name: formData.senderName,
        phone: formData.senderPhone,
        email: formData.senderEmail,
        address: formData.senderAddress
      },
      recipient: {
        name: formData.receiverName,
        phone: formData.receiverPhone,
        email: formData.receiverEmail,
        address: formData.receiverAddress
      },
      pickupLocation: formData.pickupLocation,
      dropOffLocation: formData.dropOffLocation,
      packageDetails: formData.packageDetails,
      preferredPickupTime: formData.preferredPickupTime,
      notes: null,
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
                    Complete sender and receiver contact information
                  </p>
                </div>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sender Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-lg">Sender Information</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name *</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      placeholder="Enter sender's full name"
                      className={errors.senderName ? 'border-destructive' : ''}
                    />
                    {errors.senderName && (
                      <p className="text-sm text-destructive">{errors.senderName}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senderPhone">Sender Phone *</Label>
                      <Input
                        id="senderPhone"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        placeholder="Enter sender's phone"
                        className={errors.senderPhone ? 'border-destructive' : ''}
                      />
                      {errors.senderPhone && (
                        <p className="text-sm text-destructive">{errors.senderPhone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Sender Email *</Label>
                      <Input
                        id="senderEmail"
                        name="senderEmail"
                        type="email"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        placeholder="Enter sender's email"
                        className={errors.senderEmail ? 'border-destructive' : ''}
                      />
                      {errors.senderEmail && (
                        <p className="text-sm text-destructive">{errors.senderEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senderAddress">Sender Address *</Label>
                    <Input
                      id="senderAddress"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleChange}
                      placeholder="Enter sender's complete address"
                      className={errors.senderAddress ? 'border-destructive' : ''}
                    />
                    {errors.senderAddress && (
                      <p className="text-sm text-destructive">{errors.senderAddress}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Receiver Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-lg">Receiver Information</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="receiverName">Receiver Name *</Label>
                    <Input
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      placeholder="Enter receiver's full name"
                      className={errors.receiverName ? 'border-destructive' : ''}
                    />
                    {errors.receiverName && (
                      <p className="text-sm text-destructive">{errors.receiverName}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="receiverPhone">Receiver Phone *</Label>
                      <Input
                        id="receiverPhone"
                        name="receiverPhone"
                        value={formData.receiverPhone}
                        onChange={handleChange}
                        placeholder="Enter receiver's phone"
                        className={errors.receiverPhone ? 'border-destructive' : ''}
                      />
                      {errors.receiverPhone && (
                        <p className="text-sm text-destructive">{errors.receiverPhone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receiverEmail">Receiver Email *</Label>
                      <Input
                        id="receiverEmail"
                        name="receiverEmail"
                        type="email"
                        value={formData.receiverEmail}
                        onChange={handleChange}
                        placeholder="Enter receiver's email"
                        className={errors.receiverEmail ? 'border-destructive' : ''}
                      />
                      {errors.receiverEmail && (
                        <p className="text-sm text-destructive">{errors.receiverEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="receiverAddress">Receiver Address *</Label>
                    <Input
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleChange}
                      placeholder="Enter receiver's complete address"
                      className={errors.receiverAddress ? 'border-destructive' : ''}
                    />
                    {errors.receiverAddress && (
                      <p className="text-sm text-destructive">{errors.receiverAddress}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Shipment Details Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-lg">Shipment Details</h3>
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
                </div>

                {/* Success/Error Messages */}
                {isSuccess && (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                      Booking submitted successfully! We'll contact you shortly to confirm.
                    </AlertDescription>
                  </Alert>
                )}

                {isError && (
                  <Alert className="bg-destructive/10 border-destructive/20">
                    <AlertDescription className="text-destructive">
                      Failed to submit booking. Please try again.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isPending || !isFormValid}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
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
