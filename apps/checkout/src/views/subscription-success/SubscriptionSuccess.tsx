import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import Stripe from 'stripe';

import { apiCreateCheckoutSession } from '../../api/stripeApi';

const SubscriptionSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionId] = useState(searchParams.get('session_id'));
  const [customer, setCustomer] = useState<Stripe.Customer | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function updateCustomer() {
      const customer = await apiCreateCheckoutSession(
        controller,
        sessionId ?? ''
      );
      setCustomer(customer);
    }
    updateCustomer();

    return () => controller.abort();
  }, [sessionId]);

  return (
    <div>
      <h1>Subscription Success</h1>
      {customer ? (
        <Navigate to={`/customer/${customer}`} replace={true} />
      ) : null}
    </div>
  );
};

export default SubscriptionSuccess;
