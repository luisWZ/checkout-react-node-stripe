import express from 'express';

import { stripeRoute } from './stripe/stripeRoute';

const router = express.Router();

router.use('/', stripeRoute);

router.use('*', (_req, res) => {
  res.status(404).json({ status: '404', message: 'No route config' });
});

export const routeHandler = router;
