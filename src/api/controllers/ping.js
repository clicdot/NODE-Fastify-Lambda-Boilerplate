'use strict';

const responseSchema = require('../../schemas/response');
// const CHK = require('../../modules/ping');
const pkg = require('../../../package.json');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  })
    .addHook('preHandler', async (request, reply) => {
      // const chk = new CHK();
      const data = {
        BUILD: pkg.version
      };

      request.PING = data;
    });

  fastify.get('/ping', responseSchema('testData#'), async (request, reply) => {
    // request.log.error('Error 123: Something went wrong...');

    reply.statusCode = 200;
    reply
      .code(reply.statusCode)
      .send(request.PING);
  });
};
