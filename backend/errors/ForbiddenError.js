const HTTPError = require('./HTTPError');
const { FORBIDDEN_ERR } = require('../utils/constants/constants');

class ForbiddenError extends HTTPError {
  constructor(message) {
    super(message, FORBIDDEN_ERR);
  }
}

module.exports = ForbiddenError;
