'use strict';

const path = require('path');
const AutoLoad = require('fastify-autoload');
const compression = require('compression');

module.exports = (fastify, opts, next) => {
  fastify
    .register(require('fastify-helmet'))
    .register(require('fastify-cors'))
    // .register(require('fastify-compress'))
    .register(require('fastify-jwt'), {
      secret: process.env.JWT_SECRET || 'youshouldspecifyalongsecret'
    })
    .use(compression())

    // Auto Load Middleware
    .register(AutoLoad, {
      dir: path.join(__dirname, 'middleware')
    })

    // Auto Loads Schema Definitions and Models
    .register(require('./helpers/schemaAutoLoader'))

    // Auto Load Plugins
    .register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    })

    // Auto Load Controllers
    .register(AutoLoad, {
      dir: path.join(__dirname, 'controllers')
    })

    /**
     * Version 1: File Upload API
     */
    .register(
      require('./api/v1/routes'),
      { options: process.env }
    )
  	.get('/', (request, reply) => reply.send({ hello: 'world', key: process.env.JWT_SECRET }));

  next();

}
