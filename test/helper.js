'use strict';

// This file contains code that we reuse
// between our tests.

const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../src/app');
require('../src/environment/env');

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
function config () {
  return {

  };
}

// automatically build and tear down our instance
function build (t) {
  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  app.register(fp(App), config());

  t.afterEach((done) => {
    // app.close();
    done();
  });

  // tear down our app after we are done
  t.tearDown(() => {
    // console.log('DB', app.db);
    // app.db.close();
    app.close.bind(app);
  });

  return app;
}

module.exports = { build };
