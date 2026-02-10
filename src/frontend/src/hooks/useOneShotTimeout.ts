import { useEffect, useRef } from 'react';

/**
 * Hook that schedules a single timeout callback with stable identity and proper cleanup.
 * Prevents multiple timers across rerenders by using a ref to track if the callback has been scheduled.
 */
export function useOneShotTimeout(callback: () => void, delay: number, trigger: boolean) {
  const hasScheduledRef = useRef(false);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Reset the flag when trigger becomes false
    if (!trigger) {
      hasScheduledRef.current = false;
      return;
    }

    // Only schedule if we haven't already scheduled for this trigger
    if (trigger && !hasScheduledRef.current) {
      hasScheduledRef.current = true;
      const timeoutId = setTimeout(() => {
        callbackRef.current();
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [trigger, delay]);
}
