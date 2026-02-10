interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface BookingFormData {
  customerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropOffLocation: string;
  packageDetails: string;
  preferredPickupTime: string;
  notes: string;
}

export function validateBookingForm(data: BookingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Customer name validation
  if (!data.customerName.trim()) {
    errors.customerName = 'Name is required';
  } else if (data.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters';
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[0-9+\-\s()]{10,}$/.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
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

  // Notes are optional, no validation needed

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
