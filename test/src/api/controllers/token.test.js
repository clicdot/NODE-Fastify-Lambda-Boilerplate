'use strict';

const { test } = require('tap');
const { build, close } = require('../../../helper');

test('generate token', (assert) => {
  const app = build(assert);

  assert.plan(2);

  assert.test('token route bad', async (t) => {
    // assert.plan(2);
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: { companyId: 12345 }
    });

    const { response } = JSON.parse(res.payload);

    t.deepEqual(response.function, { method: 'POST', url: '/auth/token', ip: '127.0.0.1' }, 'Test function');
    t.ok(response.messages, 'Token messages');
  });

  assert.test('token route good', async (t) => {
    // assert.plan(2);
    const res = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: { secret: 'iBtLp7aqZMbeG74AsgDGgx92fpEoCEtC7hvvYabQrVVXNih47j2fjzR4btYUJWMJ' }
    });

    const { response, data } = JSON.parse(res.payload);

    t.deepEqual(response.function, { method: 'POST', url: '/auth/token', ip: '127.0.0.1' }, 'Test function');
    t.ok(data, 'Token value');
    close(app);
  });
});
