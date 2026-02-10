import { useState } from 'react';
import { Search, Printer, Package, User, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLabelDetails } from '@/hooks/useLabelDetails';

export function LabelPrintSection() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');

  const { data: labelDetails, isLoading, isError, isFetched } = useLabelDetails(searchTrigger);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearchTrigger(trackingNumber.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const showNotFound = isFetched && !labelDetails && searchTrigger;

  return (
    <section id="label-print" className="section-padding">
      <div className="section-container">
        <div className="text-center space-y-4 mb-16 print:hidden">
          <Badge variant="outline" className="text-accent border-accent">Print Label</Badge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">
            Print Shipping Label
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your tracking number to generate and print a shipping label for your package.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Search Form */}
          <Card className="border-2 print:hidden">
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="label-tracking-number">Tracking Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="label-tracking-number"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter tracking number"
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
                          Loading...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Load Label
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Error State */}
          {isError && (
            <Alert variant="destructive" className="print:hidden">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load label details. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Not Found State */}
          {showNotFound && (
            <Alert className="print:hidden">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No label found for tracking number "{searchTrigger}". Please check the number and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Label Preview & Print */}
          {labelDetails && (
            <>
              <div className="flex justify-end print:hidden">
                <Button
                  onClick={handlePrint}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Label
                </Button>
              </div>

              {/* Printable Label */}
              <Card id="shipping-label" className="border-2 print:border-4 print:border-black">
                <CardHeader className="print:pb-4">
                  <CardTitle className="font-display text-2xl print:text-3xl">
                    ML Enterprise - Shipping Label
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 print:space-y-8">
                  {/* Tracking Number - Prominent */}
                  <div className="p-4 bg-accent/10 rounded-lg border-2 border-accent print:p-6 print:bg-gray-100">
                    <p className="text-sm text-muted-foreground mb-1 print:text-base">Tracking Number</p>
                    <p className="font-bold text-2xl print:text-4xl">{labelDetails.trackingNumber}</p>
                  </div>

                  {/* Sender & Recipient Grid */}
                  <div className="grid md:grid-cols-2 gap-6 print:gap-8">
                    {/* Sender */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <Package className="h-5 w-5 text-accent print:h-6 print:w-6" />
                        <h3 className="font-semibold text-lg print:text-xl">From</h3>
                      </div>
                      <div>
                        <p className="font-medium text-base print:text-lg">
                          {labelDetails.senderName || 'ML Enterprise'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 print:text-base">
                          {labelDetails.senderAddress || 'Tongdentsuyong Ward, A.M Road, Mokokchung, Nagaland 798601'}
                        </p>
                      </div>
                    </div>

                    {/* Recipient */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <User className="h-5 w-5 text-accent print:h-6 print:w-6" />
                        <h3 className="font-semibold text-lg print:text-xl">To</h3>
                      </div>
                      <div>
                        <p className="font-medium text-base print:text-lg">
                          {labelDetails.recipientName}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 print:text-base">
                          {labelDetails.recipientAddress}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Details */}
                  <div className="pt-4 border-t print:pt-6">
                    <h4 className="font-semibold mb-3 print:text-lg">Shipment Details</h4>
                    <div className="grid grid-cols-3 gap-4 print:gap-6">
                      {labelDetails.serviceType && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1 print:text-sm">Service Type</p>
                          <p className="font-medium text-sm print:text-base">{labelDetails.serviceType}</p>
                        </div>
                      )}
                      {labelDetails.weight && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1 print:text-sm">Weight</p>
                          <p className="font-medium text-sm print:text-base">{labelDetails.weight}</p>
                        </div>
                      )}
                      {labelDetails.dimensions && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1 print:text-sm">Dimensions</p>
                          <p className="font-medium text-sm print:text-base">{labelDetails.dimensions}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t text-center print:pt-6">
                    <p className="text-sm text-muted-foreground print:text-base">
                      ML Enterprise - Mokokchung | Phone: 9366012115
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
