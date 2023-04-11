import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Elements as Stripe } from '@stripe/react-stripe-js';

import App from './app/app';
import { apiLoadStripe } from './api/stripeApi';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Stripe stripe={apiLoadStripe()}>
      <App />
    </Stripe>
  </StrictMode>
);
