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

const router = express.Router();

router.get('/load-stripe', loadStripe);

router.post('/webhook', webhook);

router.get('/load-prices', loadPrices);

router.post('/create-checkout-session', createCheckoutSession);

router.post('/checkout-subscription-success', checkoutSubscriptionSuccess);

router.post('/customer-portal', customerPortal);

router.post('/create-no-trial-subscription', createNoTrialSubscription);

router.post('/create-free-trial-subscription', createFreeTrialSubscription);

router.post('/setup-intent', setupIntent);

export const stripeRoute = router;
