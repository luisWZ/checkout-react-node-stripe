import type { Price } from '@checkout-stripe/interface';
import { useEffect, useState } from 'react';

import { apiLoadPrices } from '../api/stripeApi';

export const useLoadPrices = () => {
  const [data, setData] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStripe() {
      try {
        setIsLoading(true);
        const prices = await apiLoadPrices(controller);
        setData(prices);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        if (errorMessage === 'canceled') return;

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    loadStripe();

    return () => controller.abort();
  }, []);

  return { data, isLoading, error };
};
