import { useLoadPrices } from '../../../hooks/useLoadPrices';
import { useState } from 'react';
import { Product } from '@checkout-stripe/interface';
import Loading from '../../../ui/Loading/Loading';
import PlanSelection from './PlanSelection';
import type { StateProduct } from '../../../models/interface';

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
