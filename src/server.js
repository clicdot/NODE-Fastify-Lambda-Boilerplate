'use strict';

const Fastify = require('fastify');
const fp = require('fastify-plugin');
require('./environment/env');

const app = require('./app');

const start = async () => {
  try {
    const fastify = Fastify({
      // logger,
      // file: './logs/error.log',
      pluginTimeout: 10000
    })
      .register(fp(app))
      .register(require('./adapter/dbconnect'));

    await fastify.listen(process.env.PORT, '0.0.0.0', (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
