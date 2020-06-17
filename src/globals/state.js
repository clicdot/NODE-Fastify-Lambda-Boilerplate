'use strict';

module.exports = {
  db: null,
  get dB () {
    return this.db;
  },
  set dB (config) {
    this.db = config;
  }
};
