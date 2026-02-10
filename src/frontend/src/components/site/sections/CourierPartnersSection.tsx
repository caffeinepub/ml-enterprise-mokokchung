import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubmitWhatsAppQuery } from '@/hooks/useSubmitWhatsAppQuery';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/utils/whatsapp';

const BUSINESS_PHONE = '9366012115';

export function CourierPartnersSection() {
  const [whatsappError, setWhatsappError] = useState<string>('');
  const { mutate: submitWhatsAppQuery, isPending } = useSubmitWhatsAppQuery();

  const partners = [
    {
      name: 'Delhivery',
      logo: '/assets/images-1.png',
      alt: 'Delhivery logo'
    },
    {
      name: 'Blue Dart / DHL',
      logo: '/assets/Untitled-1.png',
      alt: 'Blue Dart / DHL logo'
    },
    {
      name: 'Everyday Express',
      logo: '/assets/logo1-1.png',
      alt: 'Everyday Express logo'
    }
  ];

  const handleWhatsAppClick = (partnerName: string) => {
    setWhatsappError('');

    const defaultMessage = `I would like to know more about your services with ${partnerName}.`;
    
    // Build pre-filled WhatsApp message
    const message = buildWhatsAppMessage({
      name: 'Interested Customer',
      phone: 'Will provide via WhatsApp',
      email: 'Will provide via WhatsApp',
      message: defaultMessage,
      courierPartner: partnerName
    });

    // Submit WhatsApp query to backend
    submitWhatsAppQuery(
      {
        name: 'Interested Customer',
        phone: '',
        email: '',
        message: defaultMessage,
        courierPartner: partnerName,
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

  return (
    <section id="courier-partners" className="section-spacing bg-secondary/20">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="section-heading">Courier Partners</h2>
          <p className="section-description max-w-2xl mx-auto">
            We collaborate with leading courier services to ensure your packages reach their destination safely and on time.
          </p>
        </div>

        {whatsappError && (
          <Alert variant="destructive" className="mb-8 max-w-3xl mx-auto">
            <AlertDescription>
              {whatsappError}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-background rounded-lg p-8 flex flex-col items-center justify-between hover:shadow-lg transition-shadow border space-y-6"
            >
              <div className="flex items-center justify-center flex-1 w-full">
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="max-w-full h-auto max-h-24 object-contain"
                />
              </div>
              <Button
                variant="outline"
                className="w-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                onClick={() => handleWhatsAppClick(partner.name)}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    WhatsApp about {partner.name}
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
