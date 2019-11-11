'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('onSend', (request, reply, payload, next) => {
      // console.log('OnSend');

      next();
    });
});
