import { APIResponsePrice } from '@checkout-stripe/interface';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Stripe from 'stripe';

const stripeApi = axios.create({
  baseURL: '/api',
});

export const apiLoadStripe = async () => {
  try {
    const { data } = await stripeApi.get('/load-stripe');
    return loadStripe(data.publishableKey);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiLoadPrices = async (controller: AbortController) => {
  try {
    const { statusText, data } = await stripeApi.get<APIResponsePrice>(
      '/load-prices',
      {
        signal: controller.signal,
      }
    );

    console.log('data', data);

    if (statusText === 'OK') {
      return data.prices;
    }

    console.log('No price data from API');
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiCreateCheckoutSession = async (
  controller: AbortController,
  sessionId: string
) => {
  try {
    const { statusText, data } = await stripeApi.post<{
      customer: Stripe.Customer;
    }>(
      '/checkout-subscription-success',
      {
        sessionId,
      },
      { signal: controller.signal }
    );

    console.log('data', data);

    if (statusText === 'OK' && data.customer) {
      return data.customer;
    }

    console.log('No customer data from API');
    return {} as Stripe.Customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiCreateNoTrialSubscription = async ({
  name,
  email,
  userId,
  priceId,
}: Record<string, string>) => {
  try {
    const { statusText, data } = await stripeApi.post(
      '/create-no-trial-subscription',
      { name, email, userId, priceId }
    );
    console.log('data', data);

    if (statusText === 'OK') {
      return data;
    }

    console.log('Error creating subscription');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const apiSetupIntent = async ({
  name,
  email,
  userId,
}: Record<string, string>) => {
  try {
    const { statusText, data } = await stripeApi.post('/setup-intent', {
      name,
      email,
      userId,
    });

    console.log('data', data);

    if (statusText === 'OK') {
      return data;
    }

    console.log('Error creating setup intent');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const apiCreateFreeTrialSubscription = async ({
  userId,
  email,
  customerId,
  paymentMethod,
  priceId,
}: Record<string, string>) => {
  try {
    const { statusText, data } = await stripeApi.post<{
      error: Error;
      subscription: Stripe.Subscription;
    }>('/create-free-trial-subscription', {
      userId,
      email,
      customerId,
      paymentMethod,
      priceId,
    });

    console.log('data', data);

    if (statusText === 'OK') {
      return data.subscription;
    }

    console.log('Error creating subscription');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
