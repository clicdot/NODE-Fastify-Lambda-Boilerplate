'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = (fastify, opts, next) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-cors'))
    .register(require('fastify-compress'), { encodings: ['deflate', 'gzip'] })
    // .use(compression())
    .register(require('fastify-jwt'), {
      secret: process.env.JWT_SECRET
    })
    .register(require('./helpers/swagger-ui'), {
      // swagger specification which should be exposed
      specification: {
        type: 'file',
        path: 'src/swagger/swagger20-with-extensions.json'
      },
      // path under which swagger-ui will be available
      path: 'swagger-ui'
    })

    // Auto Load Middleware
    .register(AutoLoad, {
      dir: path.join(__dirname, 'middleware')
    })

    // Serve static swagger ui
    .get('/swagger-ui/', (req, reply) => {
      reply.send();
    })

    // Auto Loads Schema Definitions and Models
    .register(require('./helpers/schemaAutoLoader'))

    // Auto Load Plugins
    .register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    })

    // Auto Load Controllers
    .register(AutoLoad, {
      dir: path.join(__dirname, 'api/controllers')
    })

    /**
     * Version 1: File Upload API
     */
    .register(
      require('./api/v1/routes'),
      { options: process.env }
    );
  // .get('/', (request, reply) => reply.send({ hello: 'world', key: process.env.JWT_SECRET }));

  next();
};
