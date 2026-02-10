/**
 * Builds a pre-filled WhatsApp message text
 */
export function buildWhatsAppMessage(params: {
  name: string;
  phone: string;
  email: string;
  message: string;
  courierPartner?: string;
}): string {
  const { name, phone, email, message, courierPartner } = params;

  if (courierPartner) {
    return `Hello ML Enterprise,

I'm interested in your services with ${courierPartner}.

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}`;
  }

  return `Hello ML Enterprise,

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}`;
}

/**
 * Builds a WhatsApp wa.me URL with pre-filled message
 */
export function buildWhatsAppUrl(businessPhone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${businessPhone}?text=${encodedMessage}`;
}
