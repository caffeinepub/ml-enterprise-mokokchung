import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface BookingData {
  customerName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  dropOffLocation: string;
  packageDetails: string;
  preferredPickupTime: string;
  notes: string | null;
  created: bigint;
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookingData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.submitBooking(
        data.customerName,
        data.phone,
        data.email,
        data.pickupLocation,
        data.dropOffLocation,
        data.packageDetails,
        data.preferredPickupTime,
        data.notes,
        data.created
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}
