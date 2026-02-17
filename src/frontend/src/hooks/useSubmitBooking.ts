import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Person } from '@/backend';

interface BookingData {
  sender: Person;
  recipient: Person;
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
        data.sender,
        data.recipient,
        data.packageDetails,
        data.pickupLocation,
        data.dropOffLocation,
        data.preferredPickupTime,
        null,
        data.created
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
}
