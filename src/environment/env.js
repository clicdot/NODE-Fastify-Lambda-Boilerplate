const appRoot = require('app-root-path');

const dotenv = require('dotenv').config({
  path: appRoot + '/src/.env'
});

// test
module.exports = dotenv;
