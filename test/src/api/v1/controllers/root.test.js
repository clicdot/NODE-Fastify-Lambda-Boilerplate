'use strict';

const { test } = require('tap');
const { build, close } = require('../../../../helper');

test('root test', (assert) => {
  const app = build(assert);

  assert.plan(3);

  assert.test('bad access token route', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: { Authorization: 'Bearer badtoken' }
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1' }, 'Test function');
    assert.ok(response.messages.errors, 'Errors Exist');
    assert.same(response.messages.errors[0], 'Unauthorized', 'Unauthorized Error');
    assert.same(response.messages.errors[1], 'Authorization token is invalid: jwt malformed', 'Unauthorized Error');
  });

  assert.test('no access token route', async (assert) => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: {}
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 401, 'Failed Auth');
    assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1' }, 'Test function');
    assert.ok(response.messages.errors, 'Errors Exist');
    assert.same(response.messages.errors[0], 'Authorization Error: No Access token provided.', 'Unauthorized Error');
  });

  assert.test('root test access token route', async (assert) => {
    const auth = await app.inject({
      method: 'POST',
      url: '/auth/token',
      payload: { secret: 'iBtLp7aqZMbeG74AsgDGgx92fpEoCEtC7hvvYabQrVVXNih47j2fjzR4btYUJWMJ' }
    });

    const { accessToken } = JSON.parse(auth.payload).data;

    const res = await app.inject({
      method: 'GET',
      url: '/api/v1',
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { response } = JSON.parse(res.payload);

    assert.equal(response.code, 200, 'Success');
    assert.deepEqual(response.function, { method: 'GET', url: '/api/v1', ip: '127.0.0.1', apiVersion: 'v1' }, 'Test function');
    assert.notOk(response.messages, 'Errors do not exist');
    close(app);
    // assert.end();
  });
});
