import express, { Request } from 'express';
import cors from 'cors';

import { config } from './config';
import { errorHandler } from './lib';
import { routeHandler } from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  express.json({
    verify: function (req: Request & { rawBody: string }, _res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(cors({ origin: config.clientDomain }));

app.use('/', routeHandler);

app.use(errorHandler);

export default app;
