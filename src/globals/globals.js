'use strict';

const c = require('../constants/constants');

module.exports = {
  C: c,
  db: null,
  get dB () {
    return this.db;
  },
  set dB (config) {
    this.db = config;
  }
};
