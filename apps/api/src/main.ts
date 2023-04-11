#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';

import app from './app';
import { config } from './config';
import { logger } from './lib';

const { port } = config;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
});

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error: Error & { syscall: string; code: string }) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.fatal(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.fatal(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
