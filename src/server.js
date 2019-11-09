'use strict';

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const fs = require('fs-extra');
const appRoot = require('app-root-path');

const start = async () => {
  try {
    if (!fs.existsSync(appRoot + '/src/.env')) {
      // file doesn't exists
      throw Object.assign(
        new Error('No .env found in \'src\' folder'),
        { code: 402 }
      );
    }
    require('./environment/env');

    const app = require('./app');
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
