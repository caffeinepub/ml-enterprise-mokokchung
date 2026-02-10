import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface WhatsAppQueryData {
  name: string;
  phone: string;
  email: string;
  message: string;
  courierPartner?: string;
  timestamp: bigint;
}

export function useSubmitWhatsAppQuery() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: WhatsAppQueryData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.submitWhatsAppQuery(
        data.name,
        data.phone,
        data.email,
        data.message,
        data.courierPartner || null,
        data.timestamp
      );
    },
    onSuccess: () => {
      // Invalidate WhatsApp queries if we add a query later
      queryClient.invalidateQueries({ queryKey: ['whatsappQueries'] });
    }
  });
}
