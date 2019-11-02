'use strict';

const responseSchema = require('../../../schemas/response');

module.exports = async (fastify, opts) => {
  fastify.addHook('onRequest', async (request, reply) => {

  });

  fastify.get('/', responseSchema('testData#'), async (request, reply) => {
    // request.log.error('Error 123: Something went wrong...');
    fastify.db.query('SELECT * FROM AssetMgmt.Status').then(([results, metadata]) => {
      // Results will be an empty array and metadata will contain the number of affected rows.
      console.log(results);
    });

    reply.statusCode = 200;
    reply
      .code(reply.statusCode)
      .send({ test: 'Hello World' });
  });
};
