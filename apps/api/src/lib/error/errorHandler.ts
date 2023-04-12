import { NextFunction, Response } from 'express';

import { logger } from '../logger/logger';

const errorStatus = { status: 'error' };

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  error: Error & { type: string },
  _req,
  res: Response,
  _next: NextFunction,
) => {
  const { message, stack } = error;

  if (error.type) {
    logger.fatal(stack);
    res.status(400).send({ ...errorStatus, message });
  }
  // Unhandled errors ---------------------------------------------------------
  logger.fatal(stack);
  return res.status(500).send({ ...errorStatus, message });
};
