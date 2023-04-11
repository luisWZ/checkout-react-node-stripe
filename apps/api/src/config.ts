import 'dotenv/config';

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT,
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    publishable_key: process.env.STRIPE_PUBLISHABLE_KEY,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    checkout_currency: 'mxn',
    payment_method_types: ['card'],
    lookup_keys: ['service_monthly', 'service_annually'],
  },
  clientDomain: process.env.CLIENT_DOMAIN,
  one_week: 640_800,
};
