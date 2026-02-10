import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { LabelDetails } from '@/backend';

export function useLabelDetails(trackingNumber: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LabelDetails | null>({
    queryKey: ['label', trackingNumber],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLabelDetails(trackingNumber);
    },
    enabled: !!actor && !actorFetching && !!trackingNumber,
    retry: false,
  });
}
