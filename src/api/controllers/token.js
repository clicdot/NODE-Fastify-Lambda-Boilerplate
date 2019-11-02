'use strict';

const responseSchema = require('../../schemas/response');
const jwt = require('jsonwebtoken');

module.exports = async (fastify, opts) => {
  fastify.post('/auth/token', responseSchema('tokenData#'), async (request, reply) => {
    if (!request.body.secret) {
      throw Object.assign({}, {
        errors: ['Authorization token is invalid: missing jwt secret'],
        code: 401
      });
    }
    const token = jwt.sign(request.body, request.body.secret);

    return { accessToken: token };
  });
};
