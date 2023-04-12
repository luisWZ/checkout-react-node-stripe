import { Elements as Stripe } from '@stripe/react-stripe-js';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { apiLoadStripe } from './api/stripeApi';
import CheckoutApp from './CheckoutApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Stripe stripe={apiLoadStripe()}>
      <CheckoutApp />
    </Stripe>
  </StrictMode>
);
