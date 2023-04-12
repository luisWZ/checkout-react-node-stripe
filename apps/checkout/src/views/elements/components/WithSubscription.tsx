import { Product } from '@checkout-stripe/interface';
import { useState } from 'react';

import { useLoadPrices } from '../../../hooks/useLoadPrices';
import type { StateProduct } from '../../../models/interface';
import Loading from '../../../ui/Loading/Loading';
import PlanSelection from './PlanSelection';

export function WithSubscription(
  WrappedComponent: React.ComponentType<StateProduct>
) {
  const { data, isLoading, error } = useLoadPrices();
  const [product, setProduct] = useState<Product | null>(null);

  if (error) return null;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="plan">
      <PlanSelection data={data} setProduct={setProduct} />
      {product ? (
        <WrappedComponent product={product} setProduct={setProduct} />
      ) : null}
    </div>
  );
}
