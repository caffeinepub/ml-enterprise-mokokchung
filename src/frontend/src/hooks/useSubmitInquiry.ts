import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface InquiryData {
  name: string;
  email: string;
  message: string;
  timestamp: bigint;
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InquiryData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      await actor.submitInquiry(data.name, data.email, data.message, data.timestamp);
    },
    onSuccess: () => {
      // Invalidate inquiries query if we add one later
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });
}
