'use strict';

const fp = require('fastify-plugin');

module.exports = fp(async (fastify, opts) => {
  fastify
    .addHook('onRequest', async (request, reply) => {
      let runAuthCheck = true;
      const excludedRoutes = ['/swagger-ui/'];
      const apiRoutes = ['/api/'];

      excludedRoutes.forEach((route) => {
        const path = request.raw.url;
        if (path.includes(route) || !path.includes(apiRoutes)) {
          runAuthCheck = false;
        }
      });

      try {
        if (runAuthCheck) {
          if (request.headers.authorization) {
            const auth = await request.jwtVerify();

            request.companyId = auth.companyID;
          } else {
            throw Object.assign({}, {
              errors: ['Authorization Error: No Access token provided.'],
              code: 401
            });
          }
        }
      } catch (error) {
        console.error('AUTH ERROR:', error);
        throw error;
      }
    });
});
