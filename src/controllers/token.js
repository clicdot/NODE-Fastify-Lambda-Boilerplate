'use strict';

const responseSchema = require('../schemas/response');

module.exports = async (fastify, opts) => {
  fastify.post('/auth/token', responseSchema('tokenData#'), async (request, reply) => {
    const token = fastify.jwt.sign(request.body);
    return { accessToken: token };
  });
};
