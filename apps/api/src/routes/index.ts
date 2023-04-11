import express from 'express';

import { stripeRoute } from './stripe/stripeRoute';
import { webhook } from './stripe/stripeServices';

const router = express.Router();

router.post('/webhook', webhook);

router.use('/api', stripeRoute);

router.use('*', (_req, res) => {
  res.status(404).json({ status: '404', message: 'No route config' });
});

export const routeHandler = router;
