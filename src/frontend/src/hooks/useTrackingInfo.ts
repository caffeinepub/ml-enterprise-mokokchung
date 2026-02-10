import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ShipmentStatus } from '@/backend';

export function useTrackingInfo(trackingNumber: string) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ShipmentStatus | null>({
    queryKey: ['tracking', trackingNumber],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getTrackingInfo(trackingNumber);
    },
    enabled: !!actor && !actorFetching && !!trackingNumber,
    retry: false,
  });
}
