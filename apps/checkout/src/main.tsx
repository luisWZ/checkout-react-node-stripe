import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Elements as Stripe } from '@stripe/react-stripe-js';

import CheckoutApp from './app/CheckoutApp';
import { apiLoadStripe } from './api/stripeApi';

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
