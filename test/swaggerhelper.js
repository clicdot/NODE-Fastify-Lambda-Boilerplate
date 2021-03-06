'use strict';

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
// const fp = require('fastify-plugin');

const { beforeEach, afterEach, tearDown } = require('tap');

let app;

beforeEach(async (done) => {
  app = Fastify({ logger: { level: 'silent' } });

  done();
});

afterEach(async (done) => {
  app.close();
  done();
});

tearDown(async () => {
  app.close.bind(app);
});

// Fill in this config with all the configurations
// needed for testing the application
// function config () {
//   return {

//   };
// }

// automatically build and tear down our instance
function build (t) {
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(require('../src/helpers/swagger-ui'), {
    // swagger specification which should be exposed
    specification: {
      type: 'url',
      path: 'https://petstore.swagger.io/v2/swagger.json'
    },
    // path under which swagger-ui will be available
    path: 'swagger-ui'
  });

  // Server static swagger ui
  app.get('/swagger-ui/', function (req, reply) {
    reply.send();
  });

  // tear down our app after we are done
  t.tearDown(app.close.bind(app));

  return app;
}

module.exports = { build };
