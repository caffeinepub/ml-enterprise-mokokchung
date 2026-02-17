interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface BookingFormData {
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddress: string;
  pickupLocation: string;
  dropOffLocation: string;
  packageDetails: string;
  preferredPickupTime: string;
}

export function validateBookingForm(data: BookingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Sender name validation
  if (!data.senderName.trim()) {
    errors.senderName = 'Sender name is required';
  } else if (data.senderName.trim().length < 2) {
    errors.senderName = 'Sender name must be at least 2 characters';
  }

  // Sender phone validation
  if (!data.senderPhone.trim()) {
    errors.senderPhone = 'Sender phone number is required';
  } else if (!/^[0-9+\-\s()]{10,}$/.test(data.senderPhone.trim())) {
    errors.senderPhone = 'Please enter a valid phone number';
  }

  // Sender email validation
  if (!data.senderEmail.trim()) {
    errors.senderEmail = 'Sender email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.senderEmail.trim())) {
    errors.senderEmail = 'Please enter a valid email address';
  }

  // Sender address validation
  if (!data.senderAddress.trim()) {
    errors.senderAddress = 'Sender address is required';
  } else if (data.senderAddress.trim().length < 3) {
    errors.senderAddress = 'Sender address must be at least 3 characters';
  }

  // Receiver name validation
  if (!data.receiverName.trim()) {
    errors.receiverName = 'Receiver name is required';
  } else if (data.receiverName.trim().length < 2) {
    errors.receiverName = 'Receiver name must be at least 2 characters';
  }

  // Receiver phone validation
  if (!data.receiverPhone.trim()) {
    errors.receiverPhone = 'Receiver phone number is required';
  } else if (!/^[0-9+\-\s()]{10,}$/.test(data.receiverPhone.trim())) {
    errors.receiverPhone = 'Please enter a valid phone number';
  }

  // Receiver email validation
  if (!data.receiverEmail.trim()) {
    errors.receiverEmail = 'Receiver email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.receiverEmail.trim())) {
    errors.receiverEmail = 'Please enter a valid email address';
  }

  // Receiver address validation
  if (!data.receiverAddress.trim()) {
    errors.receiverAddress = 'Receiver address is required';
  } else if (data.receiverAddress.trim().length < 3) {
    errors.receiverAddress = 'Receiver address must be at least 3 characters';
  }

  // Pickup location validation
  if (!data.pickupLocation.trim()) {
    errors.pickupLocation = 'Pickup location is required';
  } else if (data.pickupLocation.trim().length < 3) {
    errors.pickupLocation = 'Pickup location must be at least 3 characters';
  }

  // Drop-off location validation
  if (!data.dropOffLocation.trim()) {
    errors.dropOffLocation = 'Drop-off location is required';
  } else if (data.dropOffLocation.trim().length < 3) {
    errors.dropOffLocation = 'Drop-off location must be at least 3 characters';
  }

  // Package details validation
  if (!data.packageDetails.trim()) {
    errors.packageDetails = 'Package details are required';
  } else if (data.packageDetails.trim().length < 5) {
    errors.packageDetails = 'Package details must be at least 5 characters';
  }

  // Preferred pickup time validation
  if (!data.preferredPickupTime.trim()) {
    errors.preferredPickupTime = 'Preferred pickup time is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
