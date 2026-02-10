import { useState } from 'react';
import { Search, Package, MapPin, Calendar, User, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTrackingInfo } from '@/hooks/useTrackingInfo';

export function TrackingSection() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');

  const { data: shipment, isLoading, isError, isFetched } = useTrackingInfo(searchTrigger);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearchTrigger(trackingNumber.trim());
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    if (statusLower.includes('transit') || statusLower.includes('delivery')) return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
    if (statusLower.includes('accepted') || statusLower.includes('created')) return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  const showNotFound = isFetched && !shipment && searchTrigger;

  return (
    <section id="tracking" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-accent border-accent">Track Shipment</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Track Your Package
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your tracking number below to get real-time updates on your shipment status and location.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Form */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tracking-number">Tracking Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tracking-number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter your tracking number"
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={isLoading || !trackingNumber.trim()}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Track
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to fetch tracking information. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {showNotFound && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No shipment found with tracking number "{searchTrigger}". Please check the number and try again.
              </AlertDescription>
            </Alert>
          )}

          {shipment && (
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-display text-2xl mb-2">Shipment Details</CardTitle>
                    <p className="text-sm text-muted-foreground">Tracking #: {shipment.trackingNumber}</p>
                  </div>
                  <Badge className={getStatusColor(shipment.status)} variant="outline">
                    {shipment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Information */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Location</p>
                      <p className="font-medium">{shipment.currentLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Delivery</p>
                      <p className="font-medium">{formatDate(shipment.expectedDelivery)}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Package className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Origin</p>
                      <p className="font-medium">{shipment.origin}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{shipment.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Recipient Info */}
                {shipment.labelDetails.recipientName && (
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Recipient</p>
                        <p className="font-medium">{shipment.labelDetails.recipientName}</p>
                        {shipment.labelDetails.recipientAddress && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {shipment.labelDetails.recipientAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tracking History */}
                {shipment.history && shipment.history.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-4">Tracking History</h4>
                    <div className="space-y-3">
                      {shipment.history.map((event, index) => (
                        <div key={index} className="flex items-start space-x-3 text-sm">
                          <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium">{event.status}</p>
                              <p className="text-muted-foreground text-xs">
                                {formatDate(event.timestamp)}
                              </p>
                            </div>
                            <p className="text-muted-foreground">{event.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
