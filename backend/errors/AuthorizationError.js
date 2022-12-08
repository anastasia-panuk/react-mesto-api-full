const { UNAUTHORIZED_ERR } = require('../utils/constants/constants');
const HTTPError = require('./HTTPError');

class AuthorizationError extends HTTPError {
  constructor(message) {
    super(message, UNAUTHORIZED_ERR);
  }
}

module.exports = AuthorizationError;
