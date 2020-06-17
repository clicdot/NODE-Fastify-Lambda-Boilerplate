'use strict';

function define (obj, name, value) {
  Object.defineProperty(obj, name, {
    value,
    enumerable: true,
    writable: false,
    configurable: false
  });
}

exports.CODE = {};

define(exports.CODE, 'SUCCESS', 200);
define(exports.CODE, 'CREATED', 201);
define(exports.CODE, 'BADREQUEST', 400);
define(exports.CODE, 'AUTHENTICATION', 401);
define(exports.CODE, 'FORBIDDEN', 403);
define(exports.CODE, 'NOT_FOUND', 404);
define(exports.CODE, 'NOT_ALLOWED', 405);
define(exports.CODE, 'NOT_ACCEPTABLE', 406);
define(exports.CODE, 'APPLICATION_ERROR', 406);
define(exports.CODE, 'INTERNAL_SERVER_ERROR', 500);

exports.MSG = {};

define(exports.MSG, 'AUTHORIZATION_NO_BODY', 'Authorization error: No Body');
define(exports.MSG, 'AUTHORIZATION_NO_JWT', 'Authorization error: Missing jwt credentials');
define(exports.MSG, 'AUTHORIZATION_NO_COMPANYID', 'Authorization error: No companyId');
define(exports.MSG, 'AUTHORIZATION_CREDENTIALS_ERROR', 'Authorization error: Credentials are incorrect');
define(exports.MSG, 'AUTHENTICATION_NO_USER', 'Authentication Error: No valid user found');
define(exports.MSG, 'AUTHENTICATION_NO_COMPANYID', 'Authentication Error: No valid companyId found');
define(exports.MSG, 'AUTHENTICATION_GENERIC', 'Authentication Error: Something went wrong');
define(exports.MSG, 'AUTHENTICATION_NO_TOKEN', 'Authorization Error: No Access token provided.');
define(exports.MSG, 'DATA_ERROR', 'Data Error: Something went wrong');
define(exports.MSG, 'DATA_ERROR_CREATE', 'Data Error: Already exists');

define(exports.MSG, 'VALIDATEERROR_NO_BODY', 'Validate Error: No Body');

define(exports.MSG, 'MAPPEDERROR_NO_BODY', 'Map Error: No Body');
define(exports.MSG, 'MAPPEDERROR_NO_TEMPLATE', 'Map Error: No JSON Template');
define(exports.MSG, 'MAPPEDERROR_EMPTY_TEMPLATE', 'Map Error: JSON Template Empty');

exports.CONST = {};
