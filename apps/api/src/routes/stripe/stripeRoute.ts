import express from 'express';
import Stripe from 'stripe';

import { stripeEvents } from './StripeEvents';
import { config } from '../../config';
import {
  loadStripe,
  webhook,
  loadPrices,
  createCheckoutSession,
  checkoutSubscriptionSuccess,
  customerPortal,
  createNoTrialSubscription,
  createFreeTrialSubscription,
  setupIntent,
} from './stripeServices';

const stripe = new Stripe(config.stripe.secret_key, {
  apiVersion: '2022-11-15',
});

stripeEvents.init(stripe);

export const stripeRoute = express.Router();

stripeRoute.get('/load-stripe', loadStripe);

stripeRoute.get('/load-prices', loadPrices);

stripeRoute.post('/create-checkout-session', createCheckoutSession);

stripeRoute.post('/checkout-subscription-success', checkoutSubscriptionSuccess);

stripeRoute.post('/customer-portal', customerPortal);

stripeRoute.post('/create-no-trial-subscription', createNoTrialSubscription);

stripeRoute.post('/create-free-trial-subscription', createFreeTrialSubscription);

stripeRoute.post('/setup-intent', setupIntent);
